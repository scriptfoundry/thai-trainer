import React from 'react';
import PropTypes from 'prop-types';

const HelpButton = ({ showHelp }) => <div className="help-button" onClick={ showHelp }>？</div>;

HelpButton.propTypes = {
    showHelp: PropTypes.func.isRequired
};

export default HelpButton;