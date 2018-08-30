import React from 'react';
import PropTypes from 'prop-types';
import { classNames } from '../../services/Utils';

const DrillAnswer = ({ correctAnswer, index, mistakes, onSelect, possibleAnswer }) => {
    const correct = correctAnswer === index;
    const incorrect = mistakes.indexOf(index) > -1;

    const onClick = incorrect ? null : onSelect;

    const classes = classNames({
        [`answer-${ index }`]: true,
        incorrect,
        correct,
    });

    return <h3 onClick={ onClick } className={ classes }>{ possibleAnswer }</h3>;
};

DrillAnswer.propTypes = {
    correctAnswer: PropTypes.number,
    index: PropTypes.number.isRequired,
    mistakes: PropTypes.arrayOf(PropTypes.number).isRequired,
    possibleAnswer: PropTypes.string.isRequired,

    onSelect: PropTypes.func.isRequired,
};

export default DrillAnswer;