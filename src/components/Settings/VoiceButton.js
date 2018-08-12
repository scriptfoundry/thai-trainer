import React from 'react';
import PropTypes from 'prop-types';

const VoiceButton = ({ label, disabled, onClick }) => <button onClick={ onClick } className={ disabled ? 'selected' : null}>{ label }</button>;

VoiceButton.propTypes = {
    label: PropTypes.string.isRequired,
    disabled: PropTypes.bool.isRequired,
    onClick: PropTypes.func.isRequired
};
export default VoiceButton;