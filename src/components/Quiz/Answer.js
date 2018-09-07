import React from 'react';
import PropTypes from 'prop-types';
import PlayButton from '../common/PlayButton';
import { isPronunciation } from '../../services/Voices';

const getClass = (word, selected, correct, isAnswered) => selected === null ? 'answer'
    : isAnswered && word === correct ? 'answer correct'
    : isAnswered && word === selected && word !== correct ? 'answer incorrect'
    : isAnswered ? 'answer hidden'
    : selected === word ? 'answer selected'
    : selected === null ? 'answer'
    : 'answer rejected';

const Answer = ({ word, property, onSelect, selected, correct, isAnswered }) => <div className={ getClass(word, selected, correct, isAnswered) } onClick={ onSelect }>
    { isPronunciation(property) ? <PlayButton word={word} /> : null }
    <span>{ word[property] }</span>
</div>;

const wordShape = PropTypes.shape({
    id: PropTypes.number.isRequired,
    term: PropTypes.string.isRequired,
    thai: PropTypes.string.isRequired,
});
Answer.propTypes = {
    word: wordShape.isRequired,
    property: PropTypes.string.isRequired,
    onSelect: PropTypes.func.isRequired,
    selected: wordShape,
    isAnswered: PropTypes.bool.isRequired,
    correct: wordShape,
};
export default Answer;