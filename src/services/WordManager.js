import { loadWords } from './Persistence';

export const PRONUNCIATIONTYPE_IPA = 'IPA';
export const PRONUNCIATIONTYPE_PAIBOON = 'Paiboon';

export const deserializeWord = ([id, term, thai, ipa, paiboon,altThai=null]) => ({id, term, thai, ipa, paiboon, altThai});
export const getWords = async () => {
    let words = await loadWords();
    return words.map(deserializeWord);
};