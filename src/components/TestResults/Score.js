import React from 'react';
import PropTypes from 'prop-types';

const getStyle = score => score === 1 ? 'correct' : score === -1 ? 'incorrect' : null;
const getText = score => score === 1 ? '✓' : score === -1 ? '✕' : null;

const Score = ({ scores, index }) => {
    const score = scores[index];
    const className = getStyle(score);
    const text = getText(score);

    return <span className={className}>{ text }</span>;
};

Score.propTypes = {
    index: PropTypes.number.isRequired,
    scores: PropTypes.arrayOf(PropTypes.number).isRequired
};

export default Score;