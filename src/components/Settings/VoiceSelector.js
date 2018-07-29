import React from 'react';
import PropTypes from 'prop-types';
import VoiceButton from './VoiceButton';

const VoiceSelector = ({voices, selectedVoice, onSelectVoice, heading}) => {
    const buttons = voices.map(voice => <VoiceButton key={voice.name} label={ voice.name } disabled={ voice === selectedVoice } onClick={ () => onSelectVoice(voice) } />);

    return <div className="voice-selector">
        <h2>{ heading } ({voices.length} available)</h2>
        <div>{buttons}</div>
    </div>;
};

const voicePropType = PropTypes.shape({
    name: PropTypes.string.isRequired
});

VoiceSelector.propTypes = {
    heading: PropTypes.string.isRequired,
    voices: PropTypes.arrayOf(voicePropType).isRequired,
    selectedVoice: voicePropType,
    onSelectVoice: PropTypes.func
};

export default VoiceSelector;