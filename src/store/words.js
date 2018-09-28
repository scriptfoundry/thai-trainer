import { buildRandomizedValuesQueue, getDayOfEpoch } from '../services/Utils';
import { loadWords, refreshPracticeWords, updateProgress, saveProgress, resetWords } from '../services/Leitner';
import { SETTINGS_RESETPROGRESS } from './settings';
import { TEST_SAVED } from './tests';
const createQueue = buildRandomizedValuesQueue(5);

export const WORDS_SETWORDS = 'words/setwords';
export const WORDS_CLOSEPRACTICE = 'words/closepractice';
export const WORDS_REGISTERPRACTICEEND = 'words/registerpracticeend';
const WORDS_ADVANCE = 'words/advance';
const WORDS_NUDGE = 'words/nudge';
const WORDS_ADVANCESOUND = 'words/advancesound';
const WORDS_NUDGESOUND = 'words/nudgesound';
const WORDS_RESEED = 'words/reseed';

const defaultState = {
    currentIndex: 0,
    currentStage: 0,
    queue: [],
    words: [],
};

export const reducer = (state = defaultState, { type, payload }) => {
    if (type === WORDS_ADVANCE) {
        const delta = payload === -1 ? -1 : 1;
        const length = state.queue.length;
        let currentIndex = (state.currentIndex + length + delta) % length;
        return { ...state, currentIndex, currentStage: 0 };
    }
    if (type === WORDS_NUDGE) {
        if (state.currentStage < 2) return { ...state, currentStage: state.currentStage + 1 };
        const length = state.queue.length;
        let currentIndex = (state.currentIndex + length + 1) % length;
        return { ...state, currentIndex, currentStage: 0 };
    }
    if (type === WORDS_NUDGESOUND) {
        if (state.currentStage === 0) return { ...state, currentStage: 1 };

        const length = state.queue.length;
        return { ...state, currentIndex: (state.currentIndex + 1 + length) % length, currentStage: 0 };
    }
    if (type === WORDS_ADVANCESOUND) {
        const length = state.queue.length;

        if (payload === -1) return { ...state, currentIndex: (state.currentIndex + length - 1) % length, currentStage: 0 };
        return { ...state, currentIndex: (state.currentIndex + length + 1) % length, currentStage: 0 };
    }
    if (type === WORDS_RESEED) {
        let { words, limit } = payload;
        let practiceWords = refreshPracticeWords(words, limit, getDayOfEpoch());

        words = updateProgress(words, practiceWords);
        saveProgress(words);
        let queue = createQueue(practiceWords);
        return { ...state, words, queue, currentIndex: 0 };
    }
    if (type === SETTINGS_RESETPROGRESS) {
        let words = resetWords(state.words);
        return { ...state, words, queue: [], currentIndex: 0 };
    }

    if (type === WORDS_CLOSEPRACTICE) return { ...state, queue: [], currentIndex: 0 };
    if (type === WORDS_SETWORDS) return {...state, words: payload };
    if (type === TEST_SAVED) return { ...state, words: payload };

    return state;
};

const initializeWordsManager = () => async dispatch => {
    let words = await loadWords();
    dispatch({ type: WORDS_SETWORDS, payload: words });
};

const seedPractice = (words, limit) => dispatch => dispatch({ type: WORDS_RESEED, payload: {words, limit} });
const advancePractice = direction => dispatch => dispatch({ type: WORDS_ADVANCE, payload: direction });
const nudgePractice = () => (dispatch, getState) => dispatch({ type: getState().settings.shouldJustAdvance ? WORDS_ADVANCE : WORDS_NUDGE });
const closePractice = () => dispatch => dispatch({ type: WORDS_CLOSEPRACTICE });
const advanceSound = direction => dispatch => dispatch({ type: WORDS_ADVANCESOUND, payload: direction });
const nudgeSound = () => dispatch => dispatch({ type: WORDS_NUDGESOUND });
const registerPracticeEnd = (type, count) => dispatch => dispatch({ type: WORDS_REGISTERPRACTICEEND, payload: { type, count } });

export const operations = { initializeWordsManager, seedPractice, advancePractice, nudgePractice, advanceSound, nudgeSound, closePractice, registerPracticeEnd };