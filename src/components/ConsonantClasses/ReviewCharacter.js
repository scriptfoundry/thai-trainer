import React from 'react';
import PropTypes from 'prop-types';
import { memoize } from '../../services/Utils';

const getCharacterClass = memoize((highlightedCharacters, character) => highlightedCharacters.length === 0 || highlightedCharacters.some(c => c === character) ? 'highlighted' : null, 100);

const ReviewCharacter = ({ character, highlight, highlightedCharacters }) => {
    const className = getCharacterClass(highlightedCharacters, character);
    return <div className={className} onMouseOver={ () => highlight(character) } onMouseOut={ () => highlight(null)} key={ character }>{ character }</div>;
};

ReviewCharacter.propTypes = {
    character: PropTypes.string.isRequired,
    highlight: PropTypes.func.isRequired,
    highlightedCharacters: PropTypes.arrayOf(PropTypes.string)
};

export default ReviewCharacter;