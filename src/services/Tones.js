import { memoize } from './Utils';

export const TONE_CLASS_HIGH = 1;
export const TONE_CLASS_MID = 2;
export const TONE_CLASS_LOW = 3;

const rxThai = /[ก-๛]/;
const rxZeroWidth = /[๋๊้่๎ํ์็ฺูุืึีิำั]/u;
const rxFindClass = /^([คฅฆงชซฌญฑฒณทธนพฟภมยรลวฬฮ]?)([กจฎฏดตบปอ]?)([ฉขฃฐถผฝศษสห]?)/u;
const rxLow = /[คฅฆงชซฌญฑฒณทธนพฟภมยรลวฬฮ]/;
const rxMid = /[กจฎฏดตบปอ]/;
const rxHigh = /[ฉขฃฐถผฝศษสห]/;

export const isLow = string => rxLow.test(string);
export const isMid = string => rxMid.test(string);
export const isHigh = string => rxHigh.test(string);
export const isThai = string => rxThai.test(string);

const reducer = (components, character) => {
    if (rxZeroWidth.test(character)) {
        let [lastCharacter='', toneClass] = components.pop();
        return [...components, [lastCharacter + character, toneClass]];
    }

    let [, lowMatch, midMath, highMatch] = rxFindClass.exec(character);

    let toneClass =
        lowMatch ? TONE_CLASS_LOW :
        midMath ? TONE_CLASS_MID :
        highMatch ? TONE_CLASS_HIGH :
        null;

    if (toneClass) return [...components, [character, toneClass]];
    return [...components, [character]];
};

export const getComponents = (input='') => input.split('').reduce(reducer, []);
export const getCachedCompents = memoize(getComponents, 100);