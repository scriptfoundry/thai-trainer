import { init, getAll, setThaiVoice, setEnglishVoice, setRate, say, LANGUAGE_ENGLISH, LANGUAGE_THAI } from '../services/Voices';

export const VOICE_SETVOICES = 'voice/setvoices';
export const VOICE_SETENGLISHVOICE = 'voice/setEnglishVoice';
export const VOICE_SETTHAIVOICE = 'voice/setThaiVoice';
const VOICE_SETRATE = 'voice/setRate';
const VOICE_SAYSAMPLE = 'voice/saySample';

const defaultState = {
    thaiVoice: null,
    thaiVoices: [],
    englishVoice: null,
    englishVoices: [],
    rate: 1
};

export const reducer = (state=defaultState, action) => {
    if (action.type === VOICE_SETVOICES) {
        const { thaiVoices, englishVoices, thaiVoice, englishVoice, rate } = action.payload;
        return {...state, thaiVoices, thaiVoice, englishVoices, englishVoice, rate };
    }
    if (action.type === VOICE_SETENGLISHVOICE) {
        setEnglishVoice(action.payload);
        const { englishVoice } = getAll();
        say(LANGUAGE_ENGLISH, 'I\'ll be your English voice');
        return { ...state, englishVoice };
    }
    if (action.type === VOICE_SETTHAIVOICE) {
        setThaiVoice(action.payload);
        const { thaiVoice } = getAll();
        say(LANGUAGE_THAI, 'ฉันเป็นผู้แนะนำของคุณ'); // "I am your guide"
        return { ...state, thaiVoice };
    }
    if (action.type === VOICE_SETRATE) {
        setRate(action.payload);
        const { rate } = getAll();
        say(LANGUAGE_THAI, 'ฉันเป็นผู้แนะนำของคุณ'); // "I am your guide"
        return { ...state, rate };
    }
    if (action.type === VOICE_SAYSAMPLE) {
        say(LANGUAGE_THAI, action.payload);
        // State is not modified
    }

    return state;
};

const initializeVoiceManager = () => async dispatch => {
    await init();
    dispatch({ type: VOICE_SETVOICES, payload: getAll() });
};

export const operations = {
    initializeVoiceManager,
    setEnglishVoice: voice => dispatch => dispatch({ type: VOICE_SETENGLISHVOICE, payload: voice}),
    setThaiVoice: voice => dispatch => dispatch({ type: VOICE_SETTHAIVOICE, payload: voice}),
    setRate: rate => dispatch => dispatch({ type: VOICE_SETRATE, payload: rate }),
    saySample: word => dispatch => dispatch({ type: VOICE_SAYSAMPLE, payload: word })
};