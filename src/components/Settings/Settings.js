import React from 'react';
import PropTypes from 'prop-types';
import VoiceSelector from './VoiceSelector';
import RateSelector from './RateSelector';
import PronunciationSelector from './PronunciationSelector';
import PracticeOrderSelector from './PracticeOrderSelector';

import './Settings.css';
import 'rc-slider/assets/index.css';

const Settings = (props) => {
    const {
        englishVoice,
        englishVoices,
        pronunciationType,
        rate,
        thaiVoice,
        thaiVoices,
        words,
        practiceWordLimit,
        practiceOrder,
        practiceAllAtOnce,

        changePracticeDisplayOrder,
        changePronunciationType,
        changeView,
        saySample,
        setEnglishVoice,
        setRate,
        setThaiVoice,
    } = props;

    return <div className="settings">
        <button className="back-button" onClick={ () => changeView('navigation') }>Back</button>
        <section>
            <PronunciationSelector pronunciationType={ pronunciationType } changePronunciationType={ changePronunciationType } words={ words } saySample={ saySample } />
        </section>
        <section>
            <VoiceSelector heading="Thai voices" voices={ thaiVoices } selectedVoice={ thaiVoice } onSelectVoice={ setThaiVoice } />
        </section>
        <section>
            <VoiceSelector heading="English voices" voices={ englishVoices } selectedVoice={ englishVoice } onSelectVoice={ setEnglishVoice } />
        </section>
        <section>
            <RateSelector value={ rate } onChange={setRate} />
        </section>
        <section>
            <PracticeOrderSelector changePracticeDisplayOrder={ changePracticeDisplayOrder } practiceWordLimit={ practiceWordLimit } practiceOrder={ practiceOrder } practiceAllAtOnce={ practiceAllAtOnce } />
        </section>
    </div>;
};

const voicePropType = PropTypes.shape({
    name: PropTypes.string,
});

Settings.propTypes = {
    englishVoice: voicePropType.isRequired,
    englishVoices: PropTypes.arrayOf(voicePropType).isRequired,
    practiceAllAtOnce: PropTypes.bool.isRequired,
    practiceOrder: PropTypes.array.isRequired,
    practiceWordLimit: PropTypes.number.isRequired,
    pronunciationType: PropTypes.string.isRequired,
    rate: PropTypes.number.isRequired,
    thaiVoice: voicePropType.isRequired,
    thaiVoices: PropTypes.arrayOf(voicePropType).isRequired,
    words: PropTypes.arrayOf(PropTypes.shape({
        thai: PropTypes.string.isRequired,
        ipa: PropTypes.string.isRequired,
        paiboon: PropTypes.string.isRequired,
    })).isRequired,

    changePracticeDisplayOrder: PropTypes.func.isRequired,
    changePronunciationType: PropTypes.func.isRequired,
    changeView: PropTypes.func.isRequired,
    saySample: PropTypes.func.isRequired,
    setEnglishVoice: PropTypes.func.isRequired,
    setRate: PropTypes.func.isRequired,
    setThaiVoice: PropTypes.func.isRequired,
};

export default Settings;