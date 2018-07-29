import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { operations } from '../../store';
import VoiceSelector from './VoiceSelector';
import RateSelector from './RateSelector';

import 'rc-slider/assets/index.css';

class Settings extends Component {
    render() {
        const { englishVoice, englishVoices, thaiVoice, thaiVoices, rate, setEnglishVoice, setThaiVoice, setRate } = this.props;

        return <div className="settings">
            <section>
                <VoiceSelector heading="Thai voices" voices={ thaiVoices } selectedVoice={ thaiVoice } onSelectVoice={ setThaiVoice } />
            </section>
            <section>
                <VoiceSelector heading="English voices" voices={ englishVoices } selectedVoice={ englishVoice } onSelectVoice={ setEnglishVoice } />
            </section>
            <section>
                <RateSelector value={ rate } onChange={setRate} />
            </section>
        </div>;
    }
}

const voicePropType = PropTypes.shape({
    name: PropTypes.string,
});

Settings.propTypes = {
    englishVoice: voicePropType,
    englishVoices: PropTypes.arrayOf(voicePropType),
    thaiVoice: voicePropType,
    thaiVoices: PropTypes.arrayOf(voicePropType),
    rate: PropTypes.number,
    setEnglishVoice: PropTypes.func,
    setThaiVoice: PropTypes.func,
    setRate: PropTypes.func,
};

const mapStateToProps = ({voice: {thaiVoice, thaiVoices, englishVoice, englishVoices, rate}}) => ({
    englishVoice,
    englishVoices,
    thaiVoice,
    thaiVoices,
    rate,
});

const { setEnglishVoice, setThaiVoice, setRate } = operations;

export default connect(mapStateToProps, { setEnglishVoice, setThaiVoice, setRate })(Settings);