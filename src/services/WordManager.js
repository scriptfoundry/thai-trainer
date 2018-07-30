import { loadWords } from './Persistence';

export const PRONUNCIATIONTYPE_IPA = 'IPA';
export const PRONUNCIATIONTYPE_PAIBOON = 'Paiboon';

export const deserializeWord = ([id, section, term, thai, ipa, paiboon]) => ({id, section, term, thai, ipa, paiboon});
export const serializeWord = ({id, section, term, thai, ipa, paiboon}) => ([id, section, term, thai, ipa, paiboon]);
export const getWords = async () => {
    let words = await loadWords();
    return words.map(deserializeWord);
};