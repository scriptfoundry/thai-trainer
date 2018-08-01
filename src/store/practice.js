import { buildRandomizedValuesQueue } from '../services/Utils';
import { refreshPracticeWords } from '../services/Leitner';
const createQueue = buildRandomizedValuesQueue(5);

const PRACTICE_ADVANCE = 'practice/advance';
const PRACTICE_NUDGE = 'practice/nudge';
const PRACTICE_RESEED = 'practice/reseed';
const PRACTICE_CLOSE = 'practice/close';

const defaultState = {
    currentIndex: 0,
    currentStage: 0,
    queue: [],
};

export const reducer = (state = defaultState, { type, payload }) => {
    if (type === PRACTICE_ADVANCE) {
        const delta = payload === 1 ? 1 : -1;
        const length = state.queue.length;
        let currentIndex = (state.currentIndex + length + delta) % length;
        return { ...state, currentIndex, currentStage: 0 };
    }
    if (type === PRACTICE_NUDGE) {
        if (state.currentStage === 0) return { ...state, currentStage: 1 };
        const length = state.queue.length;
        let currentIndex = (state.currentIndex + length + 1) % length;
        return { ...state, currentIndex, currentStage: 0 };
    }
    if (type === PRACTICE_RESEED) {
        let { words, limit } = payload;
        let queue = createQueue(refreshPracticeWords(words, limit));
        return { ...state, queue, currentIndex: 0 };
    }
    if (type === PRACTICE_CLOSE) return { ...state, queue: [], currentIndex: 0 };
    return state;
};

const seedPractice = (words, limit) => dispatch => dispatch({ type: PRACTICE_RESEED, payload: {words, limit} });
const advancePractice = direction => dispatch => dispatch({ type: PRACTICE_ADVANCE, payload: direction });
const nudgePractice = () => dispatch => dispatch({ type: PRACTICE_NUDGE });
const closePractice = () => dispatch => dispatch({ type: PRACTICE_CLOSE });
export const operations = { seedPractice, advancePractice, nudgePractice, closePractice };