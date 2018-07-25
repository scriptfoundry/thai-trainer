import { createApplyDeltaWithLimits, makeClamp } from './Utils';

export const STAGES = [
    { sleep: 0 },
    { sleep: 1 },
    { sleep: 3 },
    { sleep: 7 },
    { sleep: 17 },
    { sleep: Number.MAX_SAFE_INTEGER }
];
export const ASPECT_READ = 0;
export const ASPECT_COMPREHENSION = 1;
export const ASPECT_TRANSLATE = 2;

const clamp5 = makeClamp(0, 5);
const applyDelta = createApplyDeltaWithLimits(0, 5);

export const createDueDateGeneratorForAspects = (stages) => ({ day, aspectScores}) => day + stages[clamp5(Math.min(...aspectScores))].sleep;

/**
 * Given a word, the aspect tested and the result, returns a new word object having updated aspect properties
 * @param {Object} word Object having an aspectScore property that is an array of three positive integers
 * @param {Number} aspect The index of the number in the array that will be modified
 * @param {Boolean} advance If true, the number at aspect index will be advanced. If negative, it will be rewound
 * @returns {Object} Returns a new word having its aspect array replaced
 */
export const updateWordAspect = (word, aspect, advance) => {
    let { aspectScores = [0, 0, 0] } = word;
    aspectScores = applyDelta(aspectScores, aspect, advance ? 1 : -1);
    return {...word, aspectScores};
};

export const applyScoresToWords = (scores, words) => {
    return words.map(word => {
        let { id } = word;
        let items = scores.filter(item => item.id === id);

        items.forEach(({ aspect, score }) => {
            word = updateWordAspect(word, aspect, score > 0);
        });

        return word;
    });
};

export const getOutstandingWords = (words, date) => {
    const filter = ({ dueDate, aspectScores }) => dueDate <= date && Math.min(...aspectScores) <= 4;
    const sorter = (a, b) => {
        if (a.dueDate !== b.dueDate) return a.dueDate > b.dueDate ? 1 : -1;

        let aMin = Math.min(...a.aspectScores);
        let bMin = Math.min(...b.aspectScores);
        if (aMin !== bMin) return aMin < bMin ? 1 : -1;

        if (a.day !== b.day) return a.day > b.day ? 1 : -1;

        return a.id > b.id ? 1 : -1;
    };

    return words.filter(filter).sort(sorter);
};


/**
 * Fetch a new list of words to practice (can return more than `limit` if more than `limit` cards
 * were previously selected for study)
 * @param {Object[]} words All words
 * @param {Number} limit The ideal number of words to include
 * @returns {Object[]} A list of card objects for study
 */
export const refresh = (words, limit) => {
    const filterCurrent = ({ aspectScores=null }) => aspectScores !== null && Math.min(...aspectScores) === 0;
    let currentWords = words.filter(filterCurrent);

    const filterPending = ({ aspectScores=null}) => aspectScores === null;
    let pendingWords = words.filter(filterPending).slice(0, Math.max(0, limit - currentWords.length));

    return [...currentWords, ...pendingWords];
};