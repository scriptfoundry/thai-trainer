import { loadVowels } from '../services/Persistence';
import { VIEW_CHANGEVIEW } from './view';

const SOUNDS_LOADVOWELS = 'sounds/loadvowels';
const SOUNDS_SHOWVOWEL = 'sounds_showvowel';


const defaultState = {
    loaded: false,
    visibleVowel: null,
    vowels: [],
};

export const reducer = (state=defaultState, { type, payload }) => {
    if (type === SOUNDS_LOADVOWELS && state.loaded === false) {
        let vowels = payload.map(({ vowel, examples, pronunciation }) => {
            let [ipa, paiboon] = pronunciation;
            return { vowel, examples, ipa, paiboon };
        }).filter(({examples}) => examples.length > 0);

        return { ...state, vowels, loaded: true, visibleVowel: null };
    }
    if (type === SOUNDS_SHOWVOWEL) return { ...state, visibleVowel: payload };
    if (type === VIEW_CHANGEVIEW && payload !== 'vowels') return { ...state, vowels: [], loaded: false, visibleVowel: null };

    return state;
};

const initializeVowels = () => async dispatch => {
    let data = await loadVowels();
    dispatch({ type: SOUNDS_LOADVOWELS, payload: data });
};
const makeMoveVowel = (direction) => (currentVowel) => (dispatch, getState) => {
    const { vowels: { vowels } } = getState();
    const currentIndex = vowels.map(({vowel}) => vowel).indexOf(currentVowel.vowel);
    const newIndex = (currentIndex + vowels.length + direction) % vowels.length;

    dispatch({ type: SOUNDS_SHOWVOWEL, payload: vowels[newIndex]});
};
const showNextVowel = makeMoveVowel(1);
const showPrevVowel = makeMoveVowel(-1);
const showVowel = vowel => dispatch => dispatch({ type: SOUNDS_SHOWVOWEL, payload: vowel });

export const operations = { initializeVowels, showVowel, showNextVowel, showPrevVowel };