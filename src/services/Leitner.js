import { getWords } from './WordManager';
import { loadProgressData, saveProgressData } from './Persistence';
import { createApplyDeltaWithLimits, makeClamp, getDayOfEpoch } from './Utils';

export const STAGES = [
    { sleep: 0 },
    { sleep: 1 },
    { sleep: 3 },
    { sleep: 7 },
    { sleep: 13 },
    { sleep: Number.MAX_SAFE_INTEGER }
];
export const ASPECT_READ = 0;
export const ASPECT_COMPREHENSION = 1;
export const ASPECT_TRANSLATE = 2;

export const STATUS_NONE = 0;
export const STATUS_PRACTICE = 1;
export const STATUS_OVERDUE = 2;
export const STATUS_WAITING = 3;
export const STATUS_MASTERED = 4;

export const TEST_TYPEOVERDUE = 0;
export const TEST_TYPECURRENT = 1;
export const TEST_STAGE1 = 0;

const clamp5 = makeClamp(0, 5);
const applyDelta = createApplyDeltaWithLimits(0, 5);

export const createDueDateGeneratorForAspects = (stages) => (date, aspectScores) => date + stages[clamp5(Math.min(...aspectScores))].sleep;

const generateDueDateByAspects = createDueDateGeneratorForAspects(STAGES);

const deserializeProgress = ([id, date, dueDate, aspectScores]) => ({ id, date, dueDate, aspectScores });
const hasProgress = ({ date, dueDate, aspectScores }) => (date !== undefined && dueDate !== undefined && aspectScores !== undefined);
const serializeProgress = ({ id, date, dueDate, aspectScores }) => ([id, date, dueDate, aspectScores]);
const getProgress = words => words.filter(hasProgress).map(serializeProgress);

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
    const progressItems = getProgress(words);
    await saveProgressData(progressItems);
}

/**
 * Given a word, the aspect tested and the result, returns a new word object having updated aspect properties
 * @param {Array} aspectScores The scores derived from each type of question
 * @param {Number} aspect The index of the number in the array that will be modified
 * @param {Boolean} advance If true, the number at aspect index will be advanced. If negative, it will be rewound
 * @returns {Object} Returns a new word having its aspect array replaced
 */
export function updateWordAspect(aspectScores=[0, 0, 0], aspect, advance) {
    return applyDelta(aspectScores, aspect, advance ? 1 : -1);
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
export function applyScoresToWords(scores, words, date) {
    date = getDayOfEpoch(date || new Date());
    return words.map(word => {
        let { id, aspectScores } = word;
        let items = scores.filter(item => item.id === id);

        items.forEach(({ aspect, score }) =>  aspectScores = updateWordAspect(aspectScores, aspect, score > 0));

        const dueDate = generateDueDateByAspects(date, aspectScores);

        return { ...word, aspectScores, date, dueDate };
    });
}

/**
 * Gets all words that have been mastered
 * @param {Object[]} words An array of word objects having optional progress data
 * @returns {Object[]} All words having been mastered
 */
export function getMasteredWords(words) {
    return words.filter(({ aspectScores=null }) => aspectScores !== null && Math.min(...aspectScores) > 4);
}

/**
 * Gets all words due to be tested as of a provided date
 * @param {Object[]} words An array of word objects having optional progress data
 * @param {Number} date The day of the epoch
 * @returns {Object[]} A new list of words
 */
export function getOutstandingWords(words, date) {
    const filter = ({ dueDate, aspectScores }) => dueDate <= date && Math.min(...aspectScores) > 0 && Math.min(...aspectScores) <= 4;
    const sorter = (a, b) => {
        if (a.dueDate !== b.dueDate) return a.dueDate > b.dueDate ? 1 : -1;

        let aMin = Math.min(...a.aspectScores);
        let bMin = Math.min(...b.aspectScores);
        if (aMin !== bMin) return aMin < bMin ? 1 : -1;

        if (a.date !== b.date) return a.date > b.date ? 1 : -1;

        return a.id > b.id ? 1 : -1;
    };

    return words.filter(filter).sort(sorter);
}

/**
 * Gets all words currently being praticed
 * @param {Object[]} words The words to be searched
 * @returns {Object[]} The words that are currently being practiced
 */
export function getCurrentPracticeWords(words) {
    const filter = ({ aspectScores }) => Math.min(...aspectScores) === 0;
    return words.filter(hasProgress).filter(filter);
}

/**
 * Fetch a new list of words to practice (can return more than `limit` if more than `limit` cards
 * were previously selected for study)
 * @param {Object[]} words All words
 * @param {Number} limit The ideal number of words to include
 * @param {Number} date The epoch day by which the practice words should be defined
 * @returns {Object[]} A list of card objects for study
 */
export function refreshPracticeWords(words, limit, date) {
    const filterCurrent = ({ aspectScores=null }) => aspectScores !== null && Math.min(...aspectScores) === 0;
    let currentWords = words.filter(filterCurrent);

    const filterPending = ({ aspectScores=null}) => aspectScores === null;
    let pendingWords = words
        .filter(filterPending)
        .map(w => ({ ...w, date, dueDate: date, aspectScores: [0, 0, 0]}));

    return [...currentWords, ...pendingWords].slice(0, limit);
}

/**
 * Add a word to a practice deck
 * @param {Object[]} words Array of words currently selected for practice
 * @param {Object} word Word to be added
 * @param {Number} date The day index
 * @returns {Object[]} New list of words
 */
export function addPracticeWord(words, word, date) {
    return [ ...words, { ...word, date, dueDate: date, aspectScores: [0, 0, 0] } ];
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

/**
 * Get the "rough" status of a word
 * @param {Object} word The word to be tested, having an optional due date and aspect scores
 * @param {Number} day The day number against which the due date is to be compared
 * @returns {Number} Returns one of: STATUS_NONE, STATUS_ACTIVE, STATUS_WAITING or STATUS_MASTERED
 */
export function getRoughStatus({ dueDate, aspectScores }, day) {
    if (!aspectScores) return STATUS_NONE;
    if (Math.min(...aspectScores) === 0) return STATUS_PRACTICE;
    if (Math.min(...aspectScores) >= 5) return STATUS_MASTERED;
    if (dueDate <= day) return STATUS_OVERDUE;
    return STATUS_WAITING;
}

/**
 * Organize a list of words into groups by their status
 * @param {Object[]} words The words to be reduced
 * @param {Number} day The day number against which the due date is to be compared
 * @returns {Object[]} Returns words organised into groups of overdue, waiting, mastered, practiced and waiting
 */
export function organizeByRoughStatus(words, day) {
    return words.reduce((statuses, word) => {
        let status = getRoughStatus(word, day);
        statuses[status].push(word);
        return statuses;
    }, [[], [], [], [], []]);
}

/**
 * Gets a list of words filtered by their rough status
 * @param {Object[]} words The words to be filtered
 * @param {Number} day The epoch day by which the status should be determined
 * @param {Number[]} filter The status values to be included in the filtering
 * @returns {Object[]} filtered words
 */
export function filterByRoughStatus(words, day, filter=[]) {
    return words
        .map(word => ({ word, status: getRoughStatus(word, day )}))
        .filter(({ status }) => filter.includes(status))
        .map(({ word }) => word);
}

/**
 * Build an updated words list
 * @param {Object[]} words Existing list of words
 * @param {Object[]} queue List of words that may contain updated
 * @returns {Object[]} An updated list of words with any content from queue
 */
export function updateProgress(words, queue) {
    return words.map(w => queue.find((({id}) => id === w.id)) || w);
}