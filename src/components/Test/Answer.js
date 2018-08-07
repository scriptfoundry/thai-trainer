import React from 'react';
import PropTypes from 'prop-types';

const Answer = ({ word, property, onSelect }) => <div className="answer" onClick={ onSelect }>
    { word[property] }
</div>;

Answer.propTypes = {
    word: PropTypes.shape({
        id: PropTypes.number.isRequired,
        term: PropTypes.string.isRequired,
        thai: PropTypes.string.isRequired,
    }).isRequired,
    property: PropTypes.string.isRequired,
    onSelect: PropTypes.func.isRequired
};
export default Answer;