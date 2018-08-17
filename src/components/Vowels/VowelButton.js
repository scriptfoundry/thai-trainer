import React from 'react';
import PropTypes from 'prop-types';

const VowelButton = ({ onClick, vowel, visibleVowel }) => <button className={ vowel === visibleVowel ? 'selected' : null } onClick={ onClick }>{vowel.vowel}</button>;

VowelButton.propTypes = {
    vowel: PropTypes.shape({ vowel: PropTypes.string.isRequired }).isRequired,
    visibleVowel: PropTypes.object,
    onClick: PropTypes.func.isRequired,
};

export default VowelButton;