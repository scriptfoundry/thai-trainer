import Levenshtein from 'fast-levenshtein';
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

export const wait = duration => new Promise(resolve => setTimeout(resolve, duration));

export const makeClamp = (min = -Number.MAX_VALUE, max = Number.MAX_VALUE) => n => n < min ? min : n > max ? max : n;

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

export const makeExclude = equality => (arr1, arr2) => arr1.filter(v1 => arr2.some(v2 => equality(v1, v2)) === false);

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

const rxThaiNonFullWidthCharacters = /[^กขฃคฅฆงจฉชซฌญฎฏฐฑฒณดตถทธนบปผฝพฟภมยรฤลฦวศษสหฬอฮฯะาำเแโใไๅๆ๏๐๑๒๓๔๕๖๗๘๙๚๛a-z ]/;
const getFullWidthCharacters = word => word.replace(rxThaiNonFullWidthCharacters, '');

export const sortBySimilarity = (target, property, words) => {
	const needle = getFullWidthCharacters(target[property]);

    return words
        .filter(word => word[property] !== target[property])
		.map(word => ({ word, similarity: Levenshtein.get(needle, getFullWidthCharacters(word[property]) )}))
		.sort((a, b) => a.similarity > b.similarity ? 1 : -1)
		.map(({word}) => word)
		.filter((word, index, arr) => arr.findIndex(otherWord => word[property] === otherWord[property]) === index);
};

export const shuffle = (arr) => {
    // Implements Knuth shuffle algorithm
    arr = arr.slice();

    let index = arr.length;
    let tmp;
    let rnd;

    while (index > 0) {
        rnd = Math.floor(Math.random() * index);
        index -= 1;
        tmp = arr[index];
        arr[index] = arr[rnd];
        arr[rnd] = tmp;
    }

    return arr;
};

export const arraysAreSimplyEqual = (a, b) => a.length === b.length && a.every((aItem, index) => aItem === b[index]);

export const buildRandomizedValuesQueue = cycleCount => values => {
    let queue = [];
    let length = values.length;
    let lastInsert;
    let newInsert;

    for (let i = 0; i < cycleCount; i++) {
        lastInsert = queue.slice(-length);

        if (length < 3) {
            newInsert = [].concat(values);
        } else {
            do {
                newInsert = shuffle(values);
            } while (
                (newInsert[0] === lastInsert[length - 1])
                || (i === cycleCount - 1 && queue[0] === newInsert[length - 1])
                || arraysAreSimplyEqual(lastInsert, newInsert)
            );
        }

        queue = [].concat(queue, newInsert);
    }

    return queue;
};

/**
 * Moves an item of an array from one index to a new index
 * @param {any[]} arr The array to be changed
 * @param {Number} sourceIndex The index of the item that will be moved
 * @param {Number} destinationIndex The new index that the moved item will occupy
 * @returns {any[]} A new array in the desired order
 */
export function moveArrayItem(arr, sourceIndex, destinationIndex) {
    const el = arr[sourceIndex];
    if (el === undefined) return [...arr];

    destinationIndex = destinationIndex < 0 ? 0 : destinationIndex;

    const result = [...arr.slice(0, sourceIndex), ...arr.slice(sourceIndex + 1)];
    return [...result.slice(0, destinationIndex), el, ...result.slice(destinationIndex)];
}

/**
 * Makes a function that merges two arrays of objects, replacing items from the first array if necessary, using the provided property name
 * @param {string} prop The name by which the two arrays are to be merged
 * @returns {function} A function that merges two arrays by the expected property name
 */
export const createMergeObjectArrayByProperty = prop => (a, b) => {
    return a.concat(b).reduce((carry, item, index, arr) => {
        let val = item[prop];
        let firstMatch = arr.findIndex(o => o[prop] === val);

        if (firstMatch !== index) return [ ...carry.slice(0, firstMatch), item, ...carry.slice(firstMatch + 1) ];
        else return [ ...carry, item ];
    }, []);
};

export const makeUniqueRandomSamplingIncludingValue = (allValues, length) => {
    const uniqueValues = allValues.filter((value, index, arr) => arr.indexOf(value) === index);

    return requiredValue => {
        let availableValues = shuffle(uniqueValues.filter(value =>  value !== requiredValue));
        availableValues.splice(Math.floor(Math.random() * length), 0, requiredValue);
        return availableValues.slice(0, length);
    };
};