import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { makeUniqueRandomSamplingIncludingValue, buildRandomizedValuesQueue, wait } from '../../services/Utils';
import { PRONUNCIATIONTYPE_PAIBOON } from '../../services/WordManager';
import DrillAnswer from './DrillAnswer';

const makeQueue = buildRandomizedValuesQueue(5);

const DIRECTION_MAP = {
    ArrowLeft: 0,
    ArrowRight: 1,
    ArrowUp: 2,
    ArrowDown: 3,
};

let getPossibleAnswers = v => [v]; // This is overridden in the constructor

class Drill extends PureComponent {
    constructor(...args) {
        super(...args);

        const [props] = args;
        const {consonants, match: { params }, confusions, pronunciationType, showConfusionByIndex } = props;

        const visibleConfusion = parseInt(params.visibleConfusion, 10);
        if (!confusions[visibleConfusion]) {
            return null;
        }

        showConfusionByIndex(visibleConfusion);

        const consonantsToDrill = confusions[visibleConfusion].map(char => ({
            char,
            pronunciation: consonants[char][pronunciationType === PRONUNCIATIONTYPE_PAIBOON ? 3 : 2],
        }));

        getPossibleAnswers = makeUniqueRandomSamplingIncludingValue(consonantsToDrill.map((consonant => consonant.pronunciation )), 4);
        const queue = makeQueue(consonantsToDrill);

        this.state = {
            currentIndex: -1,
            possibleAnswers: [],
            currentConsonant: null,
            queue
        };

        this.onKey = this.onKey.bind(this);
        this.advance = this.advance.bind(this);
        document.addEventListener('keydown', this.onKey);
    }
    componentDidMount() {
        this.advance(1);
    }
    componentWillUnmount() {
        document.removeEventListener('keydown', this.onKey);
    }
    advance(direction=1) {
        const { queue } = this.state;
        const currentIndex = this.state.currentIndex + direction;
        const currentConsonant = queue[(currentIndex + queue.length) % queue.length];
        const possibleAnswers = getPossibleAnswers(currentConsonant.pronunciation);

        this.setState({
            correctAnswer: null,
            currentIndex,
            currentConsonant,
            possibleAnswers,
            mistakes: [],
            waiting: false,
        });
    }
    async selectAnswer(direction) {
        let { correctAnswer, possibleAnswers, currentConsonant, mistakes, waiting } = this.state;

        if (waiting) return;

        let correct = possibleAnswers[direction] === currentConsonant.pronunciation;

        if (correct) correctAnswer = direction;
        else mistakes = [ ...mistakes, direction ];

        this.setState({ correctAnswer, mistakes, waiting: true });

        await wait(correct ? 750 : 500);

        if (correct) this.advance(1);
        else this.setState({ waiting: false });
    }
    onKey({code}) {
        const direction = DIRECTION_MAP[code];

        if (direction !== undefined) this.selectAnswer(direction);
    }

    render() {
        const { correctAnswer, currentConsonant, possibleAnswers, currentIndex, mistakes } = this.state;

        if (currentConsonant === null) return null;

        const answers = possibleAnswers.map((possibleAnswer, index) => <DrillAnswer key={possibleAnswer} correctAnswer={ correctAnswer } mistakes={ mistakes } index={ index } onSelect={ () => this.selectAnswer(index) } possibleAnswer={ possibleAnswer } /> );
        const card = (<CSSTransition key={currentIndex} timeout={500} classNames="card">
            <div>
                <h1>{ currentConsonant.char }</h1>
                { answers }
            </div>
        </CSSTransition>);

        return <div className="drill">
            <TransitionGroup className="container">
                { card }
            </TransitionGroup>
        </div>;
    }
}

Drill.propTypes = {
    confusions: PropTypes.array.isRequired,
    consonants: PropTypes.object.isRequired,
    match: PropTypes.shape({ params: PropTypes.object }).isRequired,
    pronunciationType: PropTypes.string.isRequired,

    showConfusionByIndex: PropTypes.func.isRequired,
};

export default Drill;