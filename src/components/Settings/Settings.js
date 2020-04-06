import React from 'react';
import PropTypes from 'prop-types';
import VoiceSelector from './VoiceSelector';
import RateSelector from './RateSelector';
import PronunciationSelector from './PronunciationSelector';
import PracticeOrderSelector from './PracticeOrderSelector';
import RangedNumberSelector from './RangedNumberSelector';
import CharacterClassToggle from './CharacterClassToggle';
import ResetProgress from './ResetProgress';

const Settings = (props) => {
    const {
        pronunciationType,
        rate,
        thaiVoice,
        thaiVoices,
        englishVoice,
        englishVoices,
        words,
        practiceWordLimit,
        testingWordLimit,
        practiceOrder,
        practiceAllAtOnce,
        showCharacterClasses,
        resetProgressVisible,

        changePracticeDisplayOrder,
        changePronunciationType,
        changePracticeWordLimit,
        changeTestingWordLimit,
        setRate,
        setThaiVoice,
        setEnglishVoice,
        toggleCharacterClasses,
        resetProgress,
        toggleResetProgress,
    } = props;

    return <div className="settings">
        <h1>Settings</h1>
        <section>
            <VoiceSelector heading="Thai voices" voices={ thaiVoices } selectedVoice={ thaiVoice } onSelectVoice={ setThaiVoice } />
            <VoiceSelector heading="English voices" voices={ englishVoices } selectedVoice={ englishVoice } onSelectVoice={ setEnglishVoice } />
            <aside>If you see no voices above, try reloading the page now. That usually solves the problem.</aside>
            <aside>Don&apos;t see a Thai voice? Try googling on how to install <strong>Thai voice support</strong> on your specific device.</aside>
            <aside>Android users may see multiple available voices, when only one is ever used. I don&apos;t know why this happens or how to fix it.</aside>
        </section>
        <section>
            <RateSelector value={ rate } onChange={setRate} />
        </section>
        <section className="practice-order">
            <PracticeOrderSelector changePracticeDisplayOrder={ changePracticeDisplayOrder } practiceWordLimit={ practiceWordLimit } practiceOrder={ practiceOrder } practiceAllAtOnce={ practiceAllAtOnce } />
        </section>
        <section>
            <CharacterClassToggle onToggle={ toggleCharacterClasses } showCharacterClasses={ showCharacterClasses } />
        </section>
        <section>
            <RangedNumberSelector heading="Ideal number of words to practice at once" min={5} max={30} value={ practiceWordLimit } onChange={ changePracticeWordLimit } />
        </section>
        <section>
            <RangedNumberSelector heading="Maximum number of words to test at once" min={5} max={30} value={ testingWordLimit } onChange={ changeTestingWordLimit } />
        </section>
        <section>
            <PronunciationSelector pronunciationType={ pronunciationType } changePronunciationType={ changePronunciationType } words={ words } />
        </section>
        <section>
            <ResetProgress toggleResetProgress={ toggleResetProgress } resetProgress={ resetProgress } resetProgressVisible={ resetProgressVisible } />
        </section>
    </div>;
};

const voicePropType = PropTypes.shape({
    name: PropTypes.string,
});

Settings.propTypes = {
    practiceAllAtOnce: PropTypes.bool.isRequired,
    practiceOrder: PropTypes.array.isRequired,
    practiceWordLimit: PropTypes.number.isRequired,
    testingWordLimit: PropTypes.number.isRequired,
    pronunciationType: PropTypes.string.isRequired,
    rate: PropTypes.number.isRequired,
    thaiVoice: voicePropType,
    englishVoice: voicePropType,
    thaiVoices: PropTypes.arrayOf(voicePropType).isRequired,
    englishVoices: PropTypes.arrayOf(voicePropType).isRequired,
    words: PropTypes.arrayOf(PropTypes.shape({
        thai: PropTypes.string.isRequired,
        ipa: PropTypes.string.isRequired,
        paiboon: PropTypes.string.isRequired,
    })).isRequired,
    showCharacterClasses: PropTypes.bool.isRequired,
    resetProgressVisible: PropTypes.bool.isRequired,

    changePracticeDisplayOrder: PropTypes.func.isRequired,
    changePronunciationType: PropTypes.func.isRequired,
    changePracticeWordLimit: PropTypes.func.isRequired,
    setRate: PropTypes.func.isRequired,
    setThaiVoice: PropTypes.func.isRequired,
    setEnglishVoice: PropTypes.func.isRequired,
    changeTestingWordLimit: PropTypes.func.isRequired,
    toggleCharacterClasses: PropTypes.func.isRequired,
    toggleResetProgress: PropTypes.func.isRequired,
    resetProgress: PropTypes.func.isRequired,
};

export default Settings;