import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Question from './Question';
import Answer from './Answer';
import Advancement from './Advancement';

import { sortBySimilarity, shuffle } from '../../services/Utils';

const stageTestTargets = [
    { question: 'term', answer: ['pronunciation', 'thai'] },
    { question: 'pronunciation', answer: ['term', 'thai'] },
    { question: 'thai', answer: ['term', 'pronunciation'] },
];

const keyToProperty = (key, pronunciationType) => {
    if (key === 'pronunciation') return pronunciationType === 'IPA' ? 'ipa' : 'paiboon';
    return key;
};

class Challenge extends PureComponent {
    constructor(...args) {
        super(...args);

        let { queue, index, stage, words, pronunciationType } = this.props;
        let leftProperty = keyToProperty(stageTestTargets[stage].answer[0], pronunciationType);
        let rightProperty = keyToProperty(stageTestTargets[stage].answer[1], pronunciationType);

        const leftAnswers  = shuffle([...sortBySimilarity(queue[index], leftProperty, words).slice(0, 9), queue[index]]);
        const rightAnswers = shuffle([...sortBySimilarity(queue[index], rightProperty, words).slice(0, 9), queue[index]]);
        this.state = {
            leftProperty,
            rightProperty,
            leftAnswers,
            rightAnswers,
            selectedLeft: null,
            selectedRight: null,
        };
        this.answer = this.answer.bind(this);
    }
    answer(side, answer) {
        const { selectedLeft, selectedRight } = this.state;

        if (selectedLeft && selectedRight) return;

        const prop = side === 'left' ? 'selectedLeft' : 'selectedRight';
        this.setState({ [prop]: answer });
    }
    render() {
        const { queue, index, stage, pronunciationType, submitAnswer } = this.props;
        const { leftAnswers, leftProperty, rightAnswers, rightProperty, selectedLeft, selectedRight } = this.state;
        const correctAnswer = queue[index];
        const isAnswered = selectedLeft !== null && selectedRight !== null;

        const leftSide = leftAnswers.map(word => <Answer key={ word.id } isAnswered={ isAnswered } correct={ correctAnswer } selected={ selectedLeft } word={ word } property={ leftProperty } pronunciationType={ pronunciationType } onSelect={ () => this.answer('left', word) } /> );
        const rightSide = rightAnswers.map(word => <Answer key={ word.id } isAnswered={ isAnswered } correct={ correctAnswer } selected={ selectedRight }  word={ word } property={ rightProperty } pronunciationType={ pronunciationType } onSelect={ () => this.answer('right', word) } /> );

        return <div className="challenge">
            <Question word={ correctAnswer } property={ keyToProperty(stageTestTargets[stage].question, pronunciationType) } />
            <div className="answers">
                <div className="left">{ leftSide }</div>
                <div className="right">{ rightSide }</div>
            </div>

            <Advancement isLastQuestion={index === queue.length - 1} isCorrect={ correctAnswer === selectedRight && correctAnswer === selectedLeft} index={ index } isAnswered={ isAnswered } submitAnswer={ submitAnswer } />

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