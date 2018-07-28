import { loadWords } from './Persistence';

export const deserializeWord = ([id, section, term, thai, ip, paiboon]) => ({id, section, term, thai, ip, paiboon});
export const serializeWord = ({id, section, term, thai, ip, paiboon}) => ([id, section, term, thai, ip, paiboon]);
export const getWords = async () => {
    let words = await loadWords();
    return words.map(deserializeWord);
};

// export const loadLatestWords = async () => {
//     const [words, currentProgress] = await Promise.all([
//         loadWords(),
//         loadProgressData()
//     ]);

//     return words.map(([id, section, term, thai, ipa, paiboon]) => {
//         let  progress = deserializeProgress(currentProgress.find(([itemId]) => id === itemId));

//         return  { ...progress, id, section, term, thai, ipa, paiboon };
//     });
// };

// const deserializeProgress = (progress) => {
//     if (progress) {
//         let [ id, day, dueDate, easiness, interval, repetitions ] = progress;
//         return { id, day, dueDate, easiness, interval, repetitions };
//     }
// };
// export const getWord = ({id, section, term, thai, ipa, paiboon}) => ({id, section, term, thai, ipa, paiboon});

// /**
//  * Combines a word with a progress
//  * @param {Object} word
//  * @param {Object} progress
//  */
// export function applyProgress(word, progress) {
//     return {...getWord(word), ...progress };
// }
