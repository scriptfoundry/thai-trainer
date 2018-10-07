import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Question from './Question';
import Answer from './Answer';
import Advancement from './Advancement';

import { sortBySimilarity, shuffle } from '../../services/Utils';

const stageTestTargets = [
    { question: 'thai', answer: 'pronunciation' },
    { question: 'pronunciation', answer: 'thai' },
];

const keyToProperty = (key, pronunciationType) => {
    if (key === 'pronunciation') return pronunciationType === 'IPA' ? 'ipa' : 'paiboon';
    return key;
};

class Challenge extends PureComponent {
    constructor(...args) {
        super(...args);

        let { queue, index, stage, words, pronunciationType } = this.props;
        let property = keyToProperty(stageTestTargets[stage].answer, pronunciationType);

        const answers  = shuffle([...sortBySimilarity(queue[index], property, words).slice(0, 8), queue[index]]);
        this.state = {
            property,
            answers,
            selectedAnswer: null,
        };
        this.answer = this.answer.bind(this);
    }
    answer(answer) {
        if (this.state.selectedAnswer) return;

        this.setState({ selectedAnswer: answer });
    }
    render() {
        const { queue, index, stage, pronunciationType, submitAnswer } = this.props;
        const { answers, property, selectedAnswer } = this.state;
        const correctAnswer = queue[index];
        const isAnswered = selectedAnswer !== null;

        const visibleAnswers = answers.map(word =>
            <Answer
                key={ word.id }
                isAnswered={ isAnswered }
                correct={ correctAnswer }
                selected={ selectedAnswer }
                word={ word }
                property={ property }
                pronunciationType={ pronunciationType }
                onSelect={ () => this.answer(word) }
            /> );

        const isCorrect = correctAnswer === selectedAnswer;

        return <div className="challenge">
            <Question word={ correctAnswer } property={ keyToProperty(stageTestTargets[stage].question, pronunciationType) } />

            <div className="answers">{ visibleAnswers }</div>

            <Advancement isLastQuestion={index === queue.length - 1} isCorrect={ isCorrect } index={ index } isAnswered={ isAnswered } submitAnswer={ submitAnswer } />
        </div>;

    }
}

Challenge.propTypes = {
    queue: PropTypes.array.isRequired,
    index: PropTypes.number.isRequired,
    stage: PropTypes.number.isRequired,
    words: PropTypes.array.isRequired,
    pronunciationType: PropTypes.string.isRequired,
    submitAnswer: PropTypes.func.isRequired,
};
export default Challenge;