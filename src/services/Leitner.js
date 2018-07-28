import { getWords } from './WordManager';
import { loadProgressData, saveProgressData } from './Persistence';
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

const deserializeProgress = ([id, date, dueDate, aspectScores]) => ({ id, date, dueDate, aspectScores });
const hasProgress = ({ date, dueDate, aspectScores }) => (date !== undefined && dueDate !== undefined && aspectScores !== undefined);
const serializeProgress = ({ id, date, dueDate, aspectScores }) => ([id, date, dueDate, aspectScores]);

/**
 * Loads words from static file, progress data from local storage and merges all data into an array of words
 */
export async function loadWords() {
    let [progressData, wordData] = await Promise.all([
        loadProgressData(),
        getWords()
    ]);

    let progress = progressData.map(deserializeProgress);
    return wordData.map(word => {
        let progressItem = progress.find(({id}) => id === word.id);
        if (progressItem) return { ...progressItem, ...word };
        return word;
    });
}

/**
 * Saves the current progress information for a list of words
 * @param {Object[]} words Array of words containing optional progress data
 */
export async function saveProgress(words) {
    let progressItems = words.filter(hasProgress).map(serializeProgress);
    await saveProgressData(progressItems);
}

/**
 * Given a word, the aspect tested and the result, returns a new word object having updated aspect properties
 * @param {Object} word Object having an aspectScore property that is an array of three positive integers
 * @param {Number} aspect The index of the number in the array that will be modified
 * @param {Boolean} advance If true, the number at aspect index will be advanced. If negative, it will be rewound
 * @returns {Object} Returns a new word having its aspect array replaced
 */
export function updateWordAspect(word, aspect, advance) {
    let { aspectScores = [0, 0, 0] } = word;
    aspectScores = applyDelta(aspectScores, aspect, advance ? 1 : -1);
    return {...word, aspectScores};
}

/**
 * Applies the scores to a list of words. Scores are an array of objects having this shape:
 *
 *     { id {Number}, aspect {Number}, score{Number[] } }
 *
 * where id is the word id, aspect is the index of the tested property and the score is either 1 (pass) or -1 (fail)
 * @param {Number[]} scores An array of numbers representing the test score for each aspect of a given word
 * @param {Object[]} words An array of word data to have progress applied to
 * @returns A new list of words with the latest applied progress information
 */
export function applyScoresToWords(scores, words) {
    return words.map(word => {
        let { id } = word;
        let items = scores.filter(item => item.id === id);

        items.forEach(({ aspect, score }) => {
            word = updateWordAspect(word, aspect, score > 0);
        });

        return word;
    });
}

/**
 * Gets all words due to be tested as of a provided date
 * @param {Object[]} words An array of word objects having optional progress data
 * @param {Number} date The day of the epoch
 * @returns {Object[]} A new list of words
 */
export function getOutstandingWords(words, date) {
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
}

/**
 * Fetch a new list of words to practice (can return more than `limit` if more than `limit` cards
 * were previously selected for study)
 * @param {Object[]} words All words
 * @param {Number} limit The ideal number of words to include
 * @returns {Object[]} A list of card objects for study
 */
export function refreshPracticeWords(words, limit) {
    const filterCurrent = ({ aspectScores=null }) => aspectScores !== null && Math.min(...aspectScores) === 0;
    let currentWords = words.filter(filterCurrent);

    const filterPending = ({ aspectScores=null}) => aspectScores === null;
    let pendingWords = words.filter(filterPending).slice(0, Math.max(0, limit - currentWords.length));

    return [...currentWords, ...pendingWords];
}

/**
 * Add a word to a practice deck
 * @param {Object[]} words Array of words currently selected for practice
 * @param {Object} word Word to be added
 * @param {Number} day The day index
 * @returns {Object[]} New list of words
 */
export function addPracticeWord(words, word, day) {
    return [ ...words, { ...word, day, dueDate: day, aspectScores: [0, 0, 0] } ];
}

/**
 * Removes a word from a practice deck
 * @param {Object[]} words Array of words current selected for practice
 * @param {Object} word Word to be removed
 * @returns {Object[]} New list of words
 */
export function removePracticeWord(words, word) {
    return words.filter(({ id }) => id !== word.id);
}