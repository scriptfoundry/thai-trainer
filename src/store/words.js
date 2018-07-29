import { loadWords } from '../services/Leitner';
const WORD_SETWORDS = 'word/setwords';

const defaultState = {
    wordsLoaded: false,
    words: [],
};

export const reducer = (state = defaultState, { type, payload }) => {
    if (type === WORD_SETWORDS) return {...state, words: payload, wordsLoaded: true };
    return state;
};

const initializeWordsManager = () => async dispatch => {
    let words = await loadWords();
    dispatch({ type: WORD_SETWORDS, payload: words });
};

export const operations = {
    initializeWordsManager
};