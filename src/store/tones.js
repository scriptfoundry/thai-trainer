// import { buildRandomizedValuesQueue, getDayOfEpoch } from '../services/Utils';
import { loadTones } from '../services/Persistence';
import { TONE_CLASS_HIGH, TONE_CLASS_MID, TONE_CLASS_LOW, TONE_ENDING_STOP, TONE_ENDING_SONORANT, TONE_VOWEL_LONG, TONE_VOWEL_SHORT, TONE_MAI_EK, TONE_MAI_THO, TONE_MAI_TRI, TONE_MAI_CHATTAWA } from '../services/Tones';

export const TONES_INITIALIZE = 'tones/initialize';

const defaultState = {
    tonesmap: []
};

const stringToClass = {
    low: TONE_CLASS_LOW,
    mid: TONE_CLASS_MID,
    high: TONE_CLASS_HIGH,
};
const stringToLength = {
    long: TONE_VOWEL_LONG,
    short: TONE_VOWEL_SHORT,
};
const stringToEnding = {
    stop: TONE_ENDING_STOP,
    sonorant: TONE_ENDING_SONORANT,
};
const stringToMarker = {
    ek: TONE_MAI_EK,
    tho: TONE_MAI_THO,
    tri: TONE_MAI_TRI,
    chattawa: TONE_MAI_CHATTAWA,
};

export const reducer = (state=defaultState, { type, payload }) => {
    switch (type) {
        case TONES_INITIALIZE:
        return { ...state, ...payload };

        default:
        return state;
    }
};

const initializeTones = () => async dispatch => {
    let tonesmap = await loadTones();
    tonesmap = tonesmap.map(({ cls, length, ending, marker, examples }) => {
        cls = stringToClass[cls] || null;
        length = stringToLength[length] || null;
        ending = stringToEnding[ending] || null;
        marker = stringToMarker[marker] || null;

        return { cls, length, ending, marker, examples };
    });

    dispatch({ type: TONES_INITIALIZE, payload: { tonesmap } });
};

export const operations = {
    initializeTones
};
