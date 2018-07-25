import { calculateSuperMemo2Algorithm } from './SM2-plus-plus';
import { loadProgressData, loadWords, saveProgressData } from './Persistence';

export const loadLatestWords = async () => {
    let words = await loadWords();
    let currentProgress = await loadProgressData();
    return words.map(([id, section, term, thai, ipa, paiboon]) => {
        let  progress = deserializeProgress(currentProgress.find(([itemId]) => id === itemId));

        return  { ...progress, id, section, term, thai, ipa, paiboon };
    });
};

const deserializeProgress = (progress) => {
    if (progress) {
        let [ id, day, dueDate, easiness, interval, repetitions ] = progress;
        return { id, day, dueDate, easiness, interval, repetitions };
    }
};
const serializeProgress = ({id, day, dueDate, easiness, interval, repetitions}) => [id, day, dueDate, easiness, interval, repetitions];
export const getWord = ({id, section, term, thai, ipa, paiboon}) => ({id, section, term, thai, ipa, paiboon});
export const getProgress = ({id, day, dueDate, easiness, interval, repetitions}) => {
    if (dueDate) return { id, day, dueDate, easiness, interval, repetitions };
    return null;
};
export const saveProgress = words => {
    let progress = words.filter(({dueDate}) => dueDate > 0).map(serializeProgress);
    saveProgressData(progress);
};


export const applyProgress = (word, progress) => {
    return {...getWord(word), ...progress };
};
export const updateWord = (word, score) => applyProgress(word, calculateSuperMemo2Algorithm(score, getProgress(word)));

export const getCurrentWords = (words, filterDay, limit) => {
    return words.filter(({ dueDate=0 }) => dueDate <= filterDay).slice(0, limit);
};