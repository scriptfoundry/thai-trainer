import React from 'react';
import PropTypes from 'prop-types';

const VoiceButton = ({ label, disabled, onClick }) => <button onClick={ onClick } disabled={ disabled }>{ label }</button>;

VoiceButton.propTypes = {
    label: PropTypes.string.isRequired,
    disabled: PropTypes.bool.isRequired,
    onClick: PropTypes.func.isRequired
};
export default VoiceButton;