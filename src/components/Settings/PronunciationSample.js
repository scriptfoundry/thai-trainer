import React from 'react';
import PropTypes from 'prop-types';
import PlayButton from '../common/PlayButton';
const PronunciationSample = ({ word }) => <div className="sample">
        <div>{ word.ipa }</div>
        <div><PlayButton word={word} /></div>
        <div>{ word.paiboon }</div>
    </div>;


PronunciationSample.propTypes = {
    word: PropTypes.shape({
        thai: PropTypes.string.isRequired,
        ipa: PropTypes.string.isRequired,
        paiboon: PropTypes.string.isRequired
    }).isRequired,
    saySample: PropTypes.func.isRequired
};

export default PronunciationSample;