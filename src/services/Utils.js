import Levenshtein from 'fast-levenshtein';
import { WSAEPROVIDERFAILEDINIT } from 'constants';
export const classNames =  (obj) => {
	return Object.keys(obj)
		.reduce((strings, key) => obj[key] ? [...strings, key]: strings, [])
		.join(' ');
};

export const memoize = (fn, size = 3) => {
    let cache = [];

    return (...args) => {
        let match = cache.find(({args: cachedArgs}) => cachedArgs.length === args.length && cachedArgs.every((entryArg, index) => entryArg === args[index]));

        if (match) return match.results;

        let results = fn(...args);
        cache = [{args, results}, ...cache.slice(0, size - 1)];

        return results;
    };
};

const range = function (from, to) {
	if (from === to) return from;


	return Math.floor(Math.random() * (1 + to - from)) + from;
};

export const shuffle = (length) => {
	let array = new Array(length).fill(0).map((i, index) => index);
	let counter = length;
	let temp;
	let index;

	while (counter > 0) {
		index = range(0, counter - 1);

		counter--;

		temp = array[counter];
		array[counter] = array[index];
		array[index] = temp;
	}

	return array;
};

export const wait = duration => new Promise(resolve => setTimeout(resolve, duration));

export const makeClamp = (min = -Number.MAX_VALUE, max = Number.MAX_VALUE) => n => n < min ? min : n > max ? max : n;

// export const compose = (fn, ...tFns) => (...args) => fn(...tFns.map((tFn, i) => tFn(args[i])));

const slice = Function.prototype.call.bind(Array.prototype.slice);

export const pipe = (...args) => {
    if (args.length === 0) { throw new Error('at least one argument required'); }

    var f0 = args[0];
    var fRem = slice(args, 1);

    return function () {
        return fRem.reduce(function (acc, next) {
            return next(acc);
        }, f0.apply({}, args));
    };
};

/**
 * Converge a list of functions to the arguments of a core function (similar to compose)
 * @param {function} core The function to be decorated
 * @param {function[]} pipedFunctions The functions to be applied to each respective argument
 * @returns {function} Returns a function whose arguments will be piped through each respective pipedFunction before being executed via the core function
 */
export const converge = (f, fs) => (...args) => f(...args.map((a, i) => fs[i](a)));

/**
 * Compose a list of functions to the arguments of a core function
 * @param {function} core The funtion to be decorated
 * @param {function[]} pipedFunctions The functions to be applied to each respective argument of the core function
 * @returns {function}
 */
export const compose = (f, ...fns) => (...args) => f(...fns.map((fn, i) => fn(args[i])));

export const identity = v => v;

export const createApplyDeltaWithLimits = (min, max) => {
	const clamp = makeClamp(min, max);

	return (arr, index, delta) => {
		if (index < arr.length) {
			let val = arr[index];
			val = clamp(val + delta);
			return [...arr.slice(0, index), val, ...arr.slice(index + 1)];
		}
		return arr;
	};
};


/**
 * Calculates the number of days since the "start of day" (4am) on Jan1 1970
 * @param {Date} date object having two methods: getTimezoneOffset and getTime
 * @returns { Number } The number of days since 4am on the start of the epoch
 */
export const getDayOfEpoch = (date = new Date()) => {
    // tsAdjustment is the number of ms difference between local time and UTC
    const tsAdjustment = date.getTimezoneOffset() * 60000;

    // timestamp is the number of ms since 1Jan1970 in the local timezone
    const timestamp = date.getTime() - tsAdjustment;

    //     Math.floor((timestamp - fourAM)) / twentyfourHours)
    return Math.floor((timestamp - 14400000) / 86400000);
};

const rxThaiNonFullWidthCharacters = /[^กขฃคฅฆงจฉชซฌญฎฏฐฑฒณดตถทธนบปผฝพฟภมยรฤลฦวศษสหฬอฮฯะาำเแโใไๅๆ๏๐๑๒๓๔๕๖๗๘๙๚๛]/;
const getFullWidthCharacters = word => word.replace(rxThaiNonFullWidthCharacters, '');
export const makeSimilaritySorter = (property) => (target, words) => {
	words = words.filter(word => word[property] !== target[property]);

	const needle = getFullWidthCharacters(target[property]);

	return words
		.map(word => ({ word, similarity: Levenshtein.get(needle, getFullWidthCharacters(word[property]) )}))
		.sort((a, b) => a.similarity > b.similarity ? 1 : -1)
		.map(({word}) => word);
};