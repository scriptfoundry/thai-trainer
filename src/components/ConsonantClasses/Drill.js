import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { buildRandomizedValuesQueue, classNames, wait } from '../../services/Utils';
import { TONE_CLASS_LOW, TONE_CLASS_MID, TONE_CLASS_HIGH } from '../../services/Tones';
import ProgressBar from '../common/ProgressBar';
const makeQueue = buildRandomizedValuesQueue(1);

class Drill extends Component {
    constructor(...args) {
        super(...args);

        this.state = {
            busy: false,
            correctItem: null,
            hiddenItems: [],
            index: 0,
            stage: 0,
            mistakesMade: false,
            stageComplete: false,
            queue: []
        };

        this.onKey = this.onKey.bind(this);
    }
    componentDidMount() {
        document.addEventListener('keydown', this.onKey);
        this.reseed();
    }
    componentWillUnmount() {
        document.removeEventListener('keydown', this.onKey);
    }
    reseed() {
        const { low, high, mid, type } = this.props;
        let { stage, queue, index } = this.state;
        const currentCharacter = queue[index];
        const rest = type === 'all' ? low : [];
        const availableCharacters = [mid, high, rest]
            .map(arr => arr.slice(0, stage + 2))
            .reduce((availableCharacters, arr) => [...availableCharacters, ...arr]);

        stage = index >= queue.length - 1 ? stage + 1 : stage;

        do { queue = makeQueue(availableCharacters); } while (queue[0] === currentCharacter);

        this.setState({
            busy: false,
            correctItem: null,
            hiddenItems: [],
            index: 0,
            mistakesMade: false,
            queue,
            stage,
            stageComplete: false,
        });
    }
    async checkAnswer(toneClass) {
        const { low, mid, high, type } = this.props;

        if (this.state.busy) return;

        const correct =
            toneClass === TONE_CLASS_LOW && type === 'all' ? low :
            toneClass === TONE_CLASS_MID ? mid :
            toneClass === TONE_CLASS_HIGH ? high :
            null;

        if (correct === null) return;

        this.setState({ busy: true });

        let { hiddenItems, index, mistakesMade, queue } = this.state;

        if (correct.some(c => c === queue[index])) {
            this.setState({ correctItem: toneClass });
            await wait(1000);

            index += 1;

            if (mistakesMade) {
                return this.reseed();
            } else if (index >= queue.length) {
                this.setState({ stageComplete: true });
                await wait(500);
                return this.reseed();
            }

            this.setState({
                busy: false,
                correctItem: null,
                hiddenItems: [],
                index,
                queue,
            });
        } else {
            this.setState({
                busy: false,
                correct: false,
                mistakesMade: true,
                hiddenItems: [...hiddenItems, toneClass],
            });
        }
    }
    onKey({code}) {
        if (code === 'ArrowRight') this.checkAnswer(TONE_CLASS_MID);
        else if (code === 'ArrowUp') this.checkAnswer(TONE_CLASS_HIGH);
        else if (code === 'ArrowDown') this.checkAnswer(TONE_CLASS_LOW);
    }
    render() {
        const { type } = this.props;
        const { queue, index, hiddenItems, correctItem, mistakesMade, stage, stageComplete } = this.state;
        const labels = ['M', 'H', 'L'];
        const tones = [TONE_CLASS_MID, TONE_CLASS_HIGH, TONE_CLASS_LOW];

        const getAnswer = (index) => {
            const correct = correctItem === tones[index];
            const incorrect = hiddenItems.some(item => item === tones[index]);
            const className = classNames({
                [`answer-${ index + 1}`]: true,
                correct,
                incorrect,
            });
            return <h3 key={index} className={ className } onClick={ () => this.checkAnswer(tones[index]) }>{ labels[index] }</h3>;
        };

        const character = queue[index];

        const progress = mistakesMade ? 0 : stageComplete ? queue.length : index;

        return <div className="drill">
            <div className="container">
                <h1>{character}</h1>
                { getAnswer(0) }
                { getAnswer(1) }
                { type === 'all' ? getAnswer(2) : null }
            </div>
            <ProgressBar max={queue.length} value={progress} label={ `Stage ${stage}` } />
        </div>;
    }
}

Drill.propTypes = {
    low: PropTypes.arrayOf(PropTypes.string).isRequired,
    high: PropTypes.arrayOf(PropTypes.string).isRequired,
    mid: PropTypes.arrayOf(PropTypes.string).isRequired,
    type: PropTypes.oneOf(['all', 'mid-high']).isRequired,
};

export default Drill;