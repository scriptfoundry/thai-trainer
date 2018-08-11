import { buildRandomizedValuesQueue, getDayOfEpoch } from '../services/Utils';
import { loadWords, refreshPracticeWords, updateProgress, saveProgress } from '../services/Leitner';
const createQueue = buildRandomizedValuesQueue(5);

const WORDS_SETWORDS = 'words/setwords';
const WORDS_ADVANCE = 'words/advance';
const WORDS_NUDGE = 'words/nudge';
const WORDS_RESEED = 'words/reseed';
const WORDS_CLOSE = 'words/close';

const defaultState = {
    currentIndex: 0,
    currentStage: 0,
    queue: [],
    words: [],
    wordsLoaded: false,
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
    if (type === WORDS_RESEED) {
        let { words, limit } = payload;
        let practiceWords = refreshPracticeWords(words, limit, getDayOfEpoch());

        words = updateProgress(words, practiceWords);
        saveProgress(words);
        let queue = createQueue(practiceWords);
        return { ...state, words, queue, currentIndex: 0 };
    }
    if (type === WORDS_CLOSE) return { ...state, queue: [], currentIndex: 0 };
    if (type === WORDS_SETWORDS) return {...state, words: payload, wordsLoaded: true };

    return state;
};

const initializeWordsManager = () => async dispatch => {
    let words = await loadWords();
    dispatch({ type: WORDS_SETWORDS, payload: words });
};

const seedPractice = (words, limit) => dispatch => dispatch({ type: WORDS_RESEED, payload: {words, limit} });
const advancePractice = direction => dispatch => dispatch({ type: WORDS_ADVANCE, payload: direction });
const nudgePractice = (shouldJustAdvance) => dispatch => dispatch({ type: shouldJustAdvance ? WORDS_ADVANCE : WORDS_NUDGE });
const closePractice = () => dispatch => dispatch({ type: WORDS_CLOSE });

export const operations = { initializeWordsManager, seedPractice, advancePractice, nudgePractice, closePractice };