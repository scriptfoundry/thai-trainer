describe('UtilsService', () => {
    beforeEach(() => jest.resetModules());
    afterEach(() => jest.resetModules());
    it('clamps', () => {
        const makeClamp = require('../Utils').makeClamp;

        let clamp = makeClamp(0, 1);
        expect(clamp(0)).toEqual(0);
        expect(clamp(1)).toEqual(1);
        expect(clamp(2)).toEqual(1);
        expect(clamp(-1)).toEqual(0);
        expect(clamp(0.5)).toEqual(0.5);

        clamp = makeClamp(1);
        expect(clamp(0.9)).toEqual(1);
        expect(clamp(Number.MIN_SAFE_INTEGER)).toEqual(1);
        expect(clamp(Number.MAX_SAFE_INTEGER)).toEqual(Number.MAX_SAFE_INTEGER);

        clamp = makeClamp(Number.MIN_SAFE_INTEGER, Number.MAX_SAFE_INTEGER);
        expect(clamp(-Number.MAX_VALUE)).toEqual(Number.MIN_SAFE_INTEGER);
        expect(clamp(Number.MAX_SAFE_INTEGER)).toEqual(Number.MAX_SAFE_INTEGER);
        expect(clamp(Number.MIN_SAFE_INTEGER)).toEqual(Number.MIN_SAFE_INTEGER);
        expect(clamp(Number.MAX_VALUE)).toEqual(Number.MAX_SAFE_INTEGER);

        clamp = makeClamp();
        expect(clamp(-Number.MAX_SAFE_INTEGER)).toEqual(-Number.MAX_SAFE_INTEGER);
        expect(clamp(Number.MAX_SAFE_INTEGER)).toEqual(Number.MAX_SAFE_INTEGER);
        expect(clamp(Number.MIN_SAFE_INTEGER)).toEqual(Number.MIN_SAFE_INTEGER);
        expect(clamp(Number.MIN_VALUE)).toEqual(Number.MIN_VALUE);
        expect(clamp(Number.MAX_VALUE)).toEqual(Number.MAX_VALUE);
        expect(clamp(0)).toEqual(0);
    });

    it('modifies an array of numbers', () => {
        const { createApplyDeltaWithLimits } = require('../Utils');
        let arr = [0, 0, 0];

        const applyOneFiveDelta = createApplyDeltaWithLimits(0, 5);
        expect(applyOneFiveDelta(arr, 2, 1)).toEqual([0, 0, 1]);
        expect(applyOneFiveDelta(arr, 1, -1)).toEqual([0, 0, 0]);
        expect(arr).toEqual([0, 0, 0]);

        expect(applyOneFiveDelta([1, 4, 5], 0, 1)).toEqual([2, 4, 5]);
        expect(applyOneFiveDelta([1, 4, 5], 1, 1)).toEqual([1, 5, 5]);
        expect(applyOneFiveDelta([1, 4, 5], 2, 1)).toEqual([1, 4, 5]);
        expect(applyOneFiveDelta([1, 4, 5], 3, 1)).toEqual([1, 4, 5]);

        expect(applyOneFiveDelta([0, 1, 2], 0, -1)).toEqual([0, 1, 2]);
        expect(applyOneFiveDelta([0, 1, 2], 1, -1)).toEqual([0, 0, 2]);
        expect(applyOneFiveDelta([0, 1, 2], 2, -1)).toEqual([0, 1, 1]);
        expect(applyOneFiveDelta([0, 1, 2], 3, -1)).toEqual([0, 1, 2]);

        arr = [0, 0, 0];
        let revised = applyOneFiveDelta(arr, 3, -1);
        expect(revised).toEqual([0, 0, 0]);
        expect(revised).toBe(arr); // ensure that the array is not a copy when nothing has changed.
    });

    it('calculates the days since the start of the epoch', () => {
        const { getDayOfEpoch } = require('../Utils');

        const oneMinute = 60 * 1000;
        const oneHour = 60 * oneMinute;
        const fourHours = 4 * oneHour;
        const fourAM = fourHours;
        const nineHours = 9 * oneHour;
        const oneDay = 24 * oneHour;
        const thousandDays = 1000 * oneDay;

        let timezoneOffset = 4 * 60; // e.g. New York DST: GMT-4
        let timestamp = oneDay; // 1970-01-02:000000Z

        const mockDate = {
            getTimezoneOffset: () => timezoneOffset,
            getTime: () => timestamp
        };

        expect(mockDate.getTimezoneOffset()).toEqual(240);
        expect(mockDate.getTime()).toEqual(oneDay);

        expect(getDayOfEpoch(mockDate)).toEqual(0);

        timestamp = oneDay + fourHours + fourAM;
        expect(getDayOfEpoch(mockDate)).toEqual(1);

        timestamp = thousandDays;
        expect(getDayOfEpoch(mockDate)).toEqual(999);

        timestamp = thousandDays + fourHours + fourAM - oneMinute;
        expect(getDayOfEpoch(mockDate)).toEqual(999);

        timestamp = thousandDays + fourHours + fourAM;
        expect(getDayOfEpoch(mockDate)).toEqual(1000);

        timestamp = thousandDays + oneDay;
        expect(getDayOfEpoch(mockDate)).toEqual(1000);

        timestamp = thousandDays + oneDay + fourHours;
        expect(getDayOfEpoch(mockDate)).toEqual(1000);

        timestamp = thousandDays + oneDay + fourHours + fourAM;
        expect(getDayOfEpoch(mockDate)).toEqual(1001);

        timezoneOffset = -9 * 60; // (e.g. Japan: GMT+9)
        timestamp = oneDay;
        expect(getDayOfEpoch(mockDate)).toEqual(1);

        // In Japan, the sun's been up longer, so this is midnight Jan 2 + 9 hours
        timestamp = oneDay;
        expect(getDayOfEpoch(mockDate)).toEqual(1);

        // This is just before midnight on Jan 1
        timestamp = oneDay - nineHours - oneMinute;
        expect(getDayOfEpoch(mockDate)).toEqual(0);

        // This is just before 4am on Jan 2
        timestamp = oneDay - nineHours + fourHours - oneMinute;
        expect(getDayOfEpoch(mockDate)).toEqual(0);

        // This is 4am on Jan 2
        timestamp = oneDay - nineHours + fourHours;
        expect(getDayOfEpoch(mockDate)).toEqual(1);

        // This is just before 4am on the thousandth day
        timestamp = thousandDays - nineHours + fourHours - oneMinute;
        expect(getDayOfEpoch(mockDate)).toEqual(999);

        // THis is 4am on the thousandth day
        timestamp = thousandDays - nineHours + fourHours;
        expect(getDayOfEpoch(mockDate)).toEqual(1000);
    });
    it('sorts a word list by similarity with one of those words', () => {
        const { makeSimilaritySorter } = require('../Utils');
        const calculateSimilarity = makeSimilaritySorter('thai');
        const words = [
            { id: 6, section: 'Animals', term: 'Dog', thai: 'หมา', ipa: 'mǎː', paiboon: 'mǎa' },
            { id: 7, section: 'Animals', term: 'Fish', thai: 'ปลา', ipa: 'plaː', paiboon: 'bplaa' },
            { id: 8, section: 'Animals', term: 'Horse', thai: 'ม้า', ipa: 'máː', paiboon: 'máa' },
            { id: 9, section: 'Animals', term: 'Monkey', thai: 'ลิง', ipa: 'liŋ', paiboon: 'ling' },
            { id: 10, section: 'Animals', term: 'Mouse / Rat', thai: 'หนู', ipa: 'nǔː', paiboon: 'nǔu' },
            { id: 11, section: 'Animals', term: 'Pig', thai: 'หมู', ipa: 'mǔː', paiboon: 'mǔu' },
            { id: 12, section: 'Animals', term: 'Sheep', thai: 'แกะ', ipa: 'kɛ̀ʔ', paiboon: 'gɛ̀' }
        ];

        expect(calculateSimilarity(words[0], words)).toEqual([
            { id: 8, section: 'Animals', term: 'Horse', thai: 'ม้า', ipa: 'máː', paiboon: 'máa' },
            { id: 11, section: 'Animals', term: 'Pig', thai: 'หมู', ipa: 'mǔː', paiboon: 'mǔu' },
            { id: 7, section: 'Animals', term: 'Fish', thai: 'ปลา', ipa: 'plaː', paiboon: 'bplaa' },
            { id: 10, section: 'Animals', term: 'Mouse / Rat', thai: 'หนู', ipa: 'nǔː', paiboon: 'nǔu' },
            { id: 9, section: 'Animals', term: 'Monkey', thai: 'ลิง', ipa: 'liŋ', paiboon: 'ling' },
            { id: 12, section: 'Animals', term: 'Sheep', thai: 'แกะ', ipa: 'kɛ̀ʔ', paiboon: 'gɛ̀' }
        ]);
        expect(calculateSimilarity(words[1], words)).toEqual([
            { id: 6, section: 'Animals', term: 'Dog', thai: 'หมา', ipa: 'mǎː', paiboon: 'mǎa' },
            { id: 8, section: 'Animals', term: 'Horse', thai: 'ม้า', ipa: 'máː', paiboon: 'máa' },
            { id: 9, section: 'Animals', term: 'Monkey', thai: 'ลิง', ipa: 'liŋ', paiboon: 'ling' },
            { id: 10, section: 'Animals', term: 'Mouse / Rat', thai: 'หนู', ipa: 'nǔː', paiboon: 'nǔu' },
            { id: 11, section: 'Animals', term: 'Pig', thai: 'หมู', ipa: 'mǔː', paiboon: 'mǔu' },
            { id: 12, section: 'Animals', term: 'Sheep', thai: 'แกะ', ipa: 'kɛ̀ʔ', paiboon: 'gɛ̀' }
        ]);
    });

    it('can tell if two arrays are shallowly equal', () => {
        const { arraysAreSimplyEqual } = require('../Utils');
        expect(arraysAreSimplyEqual([], [])).toBe(true);
        expect(arraysAreSimplyEqual([], [1])).toBe(false);
        expect(arraysAreSimplyEqual([1], [])).toBe(false);

        expect(arraysAreSimplyEqual([1, 2, 3, 999], [1, 2, 3, 999])).toBe(true);
        expect(arraysAreSimplyEqual([1, 2, 3, 4, 999], [1, 2, 3, 999])).toBe(false);
        expect(arraysAreSimplyEqual([1, 2, 3, 999], [1, 2, 3, 1000])).toBe(false);
    });
    it('generates a series of random values that repeat minimally', () => {
        const randomValues = [0.6540056371566356, 0.60261415840193, 0.1987945168012557, 0.6226792369370973, 0.32944677232662434];
        let randomValueIndex = 0;
        global.Math = {
            random: () => randomValues[randomValueIndex++ % randomValues.length],
            floor: Math.floor
        };

        const { buildRandomizedValuesQueue } = require('../Utils');
        let r = buildRandomizedValuesQueue(5);

        expect(r([1, 2])).toEqual([ 1, 2, 1, 2, 1, 2, 1, 2, 1, 2 ]);
        expect(r([1, 2, 3])).toEqual([ 1, 3, 2, 3, 1, 2, 3, 2, 1, 3, 1, 2, 1, 3, 2 ]);
        expect(r([1, 2, 3, 5])).toEqual([ 5, 2, 1, 3, 5, 1, 2, 3, 1, 3, 5, 2, 5, 2, 1, 3, 5, 1, 2, 3 ]);
    });

});