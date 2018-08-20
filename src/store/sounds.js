import { loadVowels, loadConsonants } from '../services/Persistence';
import { VIEW_CHANGEVIEW } from './view';

const SOUNDS_LOADVOWELS = 'sounds/loadvowels';
const SOUNDS_CLEARSOUNDS = 'sounds/clearsounds';
const SOUNDS_SHOWVOWEL = 'sounds_showvowel';
const SOUNDS_LOADCONSONANTS = 'sounds/loadconsonants';
const SOUNDS_SHOWCONSONANTSBYKEY = 'sounds/showconsonantsbykey';

const defaultState = {
    vowelsLoaded: false,
    visibleVowel: null,
    vowels: [],
    consonantsLoaded: false,
    consonants: {},
    confusions: [],
    consonantKeys: {},
    visibleConsonantKey: null
};

export const reducer = (state=defaultState, { type, payload }) => {
    if (type === SOUNDS_LOADVOWELS && state.vowelsLoaded === false) {
        let vowels = payload.map(({ vowel, examples, pronunciation }) => {
            let [ipa, paiboon] = pronunciation;
            return { vowel, examples, ipa, paiboon };
        }).filter(({examples}) => examples.length > 0);

        return { ...state, vowels, vowelsLoaded: true, visibleVowel: null };
    }
    if (type === SOUNDS_CLEARSOUNDS) {
        return { ...state, ...defaultState };
    }
    if (type === SOUNDS_LOADCONSONANTS && state.consonantsLoaded === false) {
        let { confusions, consonants, consonantKeys } = payload;
        return { ...state, consonants,  confusions, consonantKeys, consonantsLoaded: true, visibleConsonantKey: 'Ch-like' };
    }

    if (type === SOUNDS_SHOWVOWEL) return { ...state, visibleVowel: payload };
    if (type === SOUNDS_SHOWCONSONANTSBYKEY) return { ...state, visibleConsonantKey: payload };
    if (type === VIEW_CHANGEVIEW && payload !== 'vowels') return { ...state, vowels: [], vowelsLoaded: false, visibleVowel: null };

    return state;
};

const initializeVowels = () => async dispatch => {
    let data = await loadVowels();
    dispatch({ type: SOUNDS_LOADVOWELS, payload: data });
};
const makeMoveVowel = (direction) => (currentVowel) => (dispatch, getState) => {
    const { sounds: { vowels } } = getState();
    const currentIndex = vowels.map(({vowel}) => vowel).indexOf(currentVowel.vowel);
    const newIndex = (currentIndex + vowels.length + direction) % vowels.length;

    dispatch({ type: SOUNDS_SHOWVOWEL, payload: vowels[newIndex]});
};
const clearSounds = () => dispatch => {
    dispatch({ type: SOUNDS_CLEARSOUNDS });
};
const showNextVowel = makeMoveVowel(1);
const showPrevVowel = makeMoveVowel(-1);
const showVowel = vowel => dispatch => dispatch({ type: SOUNDS_SHOWVOWEL, payload: vowel });

const initializeConsonants = () => async dispatch => {
    let { confusions, consonants, keys } = await loadConsonants();
    const keyNames = Object.keys(keys);
    confusions = confusions.map(s => s.split(''));
    let consonantKeys = Object.keys(consonants).reduce((current, consonant) => {
        let [x, y] = consonants[consonant];

        let key = keyNames.find((name) => {
            let [a, b] = keys[name];
            return (a === x || a === null) && (b === y || b === null);
        }) || 'Other';

        if (!current[key]) current[key] = [];
        current[key].push(consonant);

        return current;
    }, {});

    dispatch({ type: SOUNDS_LOADCONSONANTS, payload: { confusions, consonants, consonantKeys } });
};
const showConsonantsByKey = (key) => (dispatch) => dispatch({ type: SOUNDS_SHOWCONSONANTSBYKEY, payload: key });

export const operations = { initializeVowels, clearSounds, showVowel, showNextVowel, showPrevVowel, initializeConsonants, showConsonantsByKey };