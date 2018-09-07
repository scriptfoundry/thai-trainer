/* global window, speechSynthesis */
import { loadVoices, saveVoices } from './Persistence';
import PropTypes from 'prop-types';

export const LANGUAGE_THAI = 'voices/languagethai';
export const LANGUAGE_ENGLISH = 'voices/languageenglish';

let thaiVoices = [];
let thaiVoice = null;
let thaiVoiceName = null;
let englishVoices = [];
let englishVoice = null;
let englishVoiceName = null;
let rate = 1;

export const saveSettings = async () => {
    let englishVoiceName = englishVoice ? englishVoice.name : null;
    let thaiVoiceName = thaiVoice ? thaiVoice.name : null;
    await saveVoices({ englishVoiceName, thaiVoiceName, rate });
};

export const init = () => new Promise(async (resolve) => {
    const voiceSettings = await loadVoices();
    ({ englishVoiceName = null, thaiVoiceName = null, rate = rate } = voiceSettings || {});

    const processVoices = () => {
        const rxEnglishVoiceTest = /^en/i;
        const rxThaiVoiceTest = /^th/i;
        const allVoices = speechSynthesis.getVoices();

        thaiVoices = allVoices.filter(({lang}) => rxThaiVoiceTest.test(lang));
        englishVoices = allVoices.filter(({lang}) => rxEnglishVoiceTest.test(lang));

        englishVoice = englishVoices.find(({name}) => name === englishVoiceName) || englishVoices[0];
        englishVoiceName = englishVoice ? englishVoice.name : null;
        thaiVoice = englishVoices.find(({name}) => name === thaiVoiceName) || thaiVoices[0];
        thaiVoiceName = thaiVoice ? thaiVoice.name : null;

        resolve();
    };
    if (speechSynthesis.getVoices().length) processVoices();
    else speechSynthesis.onvoiceschanged = processVoices;
});

const findVoice = (voices, newVoiceName) => voices.find(({ name }) => newVoiceName === name);
export const setThaiVoice = ({ name }) => {
    thaiVoice = findVoice(thaiVoices, name) || thaiVoice;
    saveSettings();
};
export const setEnglishVoice = ({ name }) => {
    englishVoice = findVoice(englishVoices, name) || englishVoice;
    saveSettings();
};
export const setRate = (newRate) => {
    rate = newRate;
    saveSettings();
};
export const say = (language, word, cancelCurrent = true) => new Promise(resolve => {
    if (cancelCurrent) speechSynthesis.cancel();

    const text = language === LANGUAGE_ENGLISH ? word.term : (word.altThai || word.thai);
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.voice = language === LANGUAGE_ENGLISH ? englishVoice : thaiVoice;
    utterance.rate = language === LANGUAGE_ENGLISH ? 1 : rate;

    utterance.onend = resolve;

    speechSynthesis.speak(utterance);
});

export const sayWords = (language, texts) => {
    const next = async (texts) => {
        let [ current, ...rest ] = texts;
        await say(language, language === LANGUAGE_ENGLISH ? { term: current } : { thai: current } );
        if (rest.length) next(rest);
    };
    if (texts) next(texts);
};

export const voicePropType = PropTypes.shape({
    lang: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired
});

export const isPronunciation = property => property === 'ipa' || property === 'paiboon';

export const getAll = () => ({
    thaiVoices,
    englishVoices,
    thaiVoice,
    englishVoice,
    rate
});