import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { TONE_FALLING, TONE_HIGH, TONE_LOW, TONE_MID, TONE_RISING } from '../../services/Tones';
import { buildRandomizedValuesQueue, classNames, wait } from '../../services/Utils';
import { getTone, getTonesByStage } from '../../services/Tones';
import { say, LANGUAGE_THAI } from '../../services/Voices';
import ProgressBar from '../common/ProgressBar';

const randomize = buildRandomizedValuesQueue(3);

class Drill extends PureComponent {
    constructor(...args) {
        super(...args);

        let { stage } = this.props;
        stage = Math.max(1, stage);

        const { queue, label } = this.reseed(null, stage);

        this.state = {
            busy: false,
            correctItem: null,
            hiddenItems: [],
            index: 0,
            label,
            mistakeMake: false,
            queue,
            stage,
        };

        this.onKey = this.onKey.bind(this);
    }
    reseed(currentQueue, stage) {
        let queue;

        let {tones, label} = getTonesByStage(stage, this.props.tonesmap);
        do {
            queue = randomize(tones).map(item => ({ item, word: item.examples[Math.floor(Math.random() * item.examples.length)] , tone: getTone(item)}));
        } while(currentQueue && queue.tone === currentQueue[currentQueue.length - 1].tone);

        return {queue, label};
    }
    componentDidMount() {
        this.props.initializeTones();
        document.addEventListener('keydown', this.onKey);
    }
    componentWillUnmount() {
        document.removeEventListener('keydown', this.onKey);
    }
    async checkAnswer(answer) {
        if (this.state.busy) return;

        let { queue, correctItem, hiddenItems, index, label, mistakeMake, stage } = this.state;
        let delayTime = 300;
        const { tone, word } = queue[index];

        if (answer === tone) {
            this.setState({
                busy: true,
                correctItem: answer,
            });
            say(LANGUAGE_THAI, { thai: word });
            index += 1;
            hiddenItems = [];
            correctItem = null;
            delayTime = 1000;

            if (mistakeMake) {
                index = 0;
                ({ queue, label } = this.reseed(queue, stage));
                mistakeMake = false;
            } else if (index >= queue.length) {
                index = 0;
                stage += 1;
                ({ queue, label } = this.reseed(queue, stage));
            }

        } else {
            hiddenItems = [...hiddenItems, answer];
            mistakeMake = true;

            this.setState({
                busy: true,
                hiddenItems,
            });
        }

        await wait(delayTime);

        this.setState({
            busy: false,
            correctItem,
            hiddenItems,
            index,
            label,
            mistakeMake,
            queue,
            stage,
        });
    }
    onKey({code}) {
        if (code === 'ArrowRight') this.checkAnswer(TONE_HIGH);
        else if (code === 'ArrowUp') this.checkAnswer(TONE_RISING);
        else if (code === 'ArrowDown') this.checkAnswer(TONE_FALLING);
        else if (code === 'ArrowLeft') this.checkAnswer(TONE_LOW);
        else if (code === 'Enter' || code === 'Return' || code === 'Space') this.checkAnswer(TONE_MID);
    }

    render() {
        const { queue, index, hiddenItems, correctItem, label, mistakeMake } = this.state;
        const { word } = queue[index];
        const getAnswer = (key, tone, label) => {
            const className = classNames({
                [`answer-${key}`]: true,
                incorrect: hiddenItems.some(item => item === tone),
                correct: correctItem === tone
            });
            return <h3 className={ className } onClick={ () => this.checkAnswer(tone) }>{label}</h3>;
        };

        return <div className="drill">
            <div className="container">
                <h1>{word}</h1>
                { getAnswer(0, TONE_LOW, 'L') }
                { getAnswer(1, TONE_HIGH, 'H') }
                { getAnswer(2, TONE_RISING, 'R') }
                { getAnswer(3, TONE_FALLING, 'F') }
                { getAnswer(4, TONE_MID, 'Neutral') }
            </div>
            <ProgressBar max={queue.length} value={ mistakeMake ? 0 : index} label={ label } />
        </div>;
    }
}

Drill.propTypes = {
    tonesmap: PropTypes.array.isRequired,
    stage: PropTypes.number,

    initializeTones: PropTypes.func.isRequired,
};

export default Drill;