import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Question from './Question';
import Answer from './Answer';
import { sortBySimilarity, shuffle } from '../../services/Utils';

const stageTestTargets = [
    { from: 'pronunciation', to: 'term' },
    { from: 'thai', to: 'term' },
    { from: 'term', to: 'pronunciation' },
];

const keyToProperty = (key, pronunciationType) => {
    if (key === 'pronunciation') return pronunciationType === 'IPA' ? 'ipa' : 'paiboon';
    return key;
};

class Challenge extends PureComponent {
    constructor(...args) {
        super(...args);

        let { queue, index, stage, testWords, pronunciationType } = this.props;
        let destination = keyToProperty(stageTestTargets[stage].to, pronunciationType);

        const answers = shuffle([...sortBySimilarity(queue[index], destination, testWords).slice(0, 9), queue[index]]);
        this.state = {
            answers,
            destination
        };
    }
    render() {
        const { queue, index, stage, pronunciationType, submitAnswer } = this.props;
        const { answers, destination } = this.state;

        const options = answers.map(word => <Answer key={ word.id } word={ word } property={ destination } pronunciationType={ pronunciationType } onSelect={ () => submitAnswer(word) } /> );

        return <div className="challenge">
            <Question word={ queue[index] } property={ keyToProperty(stageTestTargets[stage].from, pronunciationType) } />
            { options }
            <button onClick={ () => submitAnswer(null) }>Not sure / Skip</button>
        </div>;

    }
}

Challenge.propTypes = {
    queue: PropTypes.array.isRequired,
    index: PropTypes.number.isRequired,
    stage: PropTypes.number.isRequired,
    testWords: PropTypes.array.isRequired,
    pronunciationType: PropTypes.string.isRequired,
    submitAnswer: PropTypes.func.isRequired,
};
export default Challenge;