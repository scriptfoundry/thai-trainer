import {
    STAGES,
    ASPECT_COMPREHENSION,
    ASPECT_READ,
    ASPECT_TRANSLATE,

    STATUS_PRACTICE,
    STATUS_OVERDUE,
    STATUS_MASTERED,
    STATUS_NONE,
    STATUS_WAITING,

    updateWordAspect,
    applyScoresToWords,
    createDueDateGeneratorForAspects,
    getOutstandingWords,
    refreshPracticeWords,
    addPracticeWord,
    removePracticeWord,
    getRoughStatus,
    organizeByRoughStatus,
    filterByRoughStatus,
    updateProgress,
    resetWords,
} from '../Leitner';

describe('Leitner', () => {
    beforeEach((() => jest.resetModules()));
    afterEach(() => jest.resetModules());

    it('exists', () => {
        expect(ASPECT_COMPREHENSION).toBeDefined();
        expect(ASPECT_READ).toBeDefined();
        expect(ASPECT_TRANSLATE).toBeDefined();
    });
    it('has stages whose sleep value is always increasing', () => {
        expect(STAGES).toBeDefined();
        expect(STAGES.constructor).toBe(Array);

        STAGES.forEach(({ sleep }, index, arr) => {
            expect(typeof sleep).toEqual('number');
            if (index === 0) expect(sleep).toEqual(0);
            else expect(sleep > arr[index - 1].sleep).toBe(true);
        });
    });
    it('loads words and progress from file and local storage', async () => {
        const wordsToGet = [
            [1,'Animal','สัตว์','sàt','sàt'],
            [2,'Bear','หมี','mǐː','mǐi'],
            [3,'Bird','นก','nók','nók'],
            [4,'Cat','แมว','mɛːw','mɛɛo'],
            [5,'Cow / Bull','วัว','wuːa','wua'],
            [6,'Dog','หมา','mǎː','mǎa'],
            [7,'Fish','ปลา','plaː','bplaa'],
            [8,'Horse','ม้า','máː','máa'],
            [9,'Monkey','ลิง','liŋ','ling'],
            [10,'Mouse / Rat','หนู','nǔː','nǔu'],
        ];

        const json = jest.fn(() => wordsToGet);
        global.fetch = jest.fn(() => ({ json }));

        let localForageData = null;
        const getItem = jest.fn(() => localForageData);
        jest.doMock('localforage', () => ({ getItem }));

        const { loadWords } = require('../Leitner');

        let allWordData = await loadWords();
        expect(getItem).toHaveBeenCalledWith('progress');
        expect(allWordData).toEqual([
            {'id': 1, 'ipa': 'sàt', 'paiboon': 'sàt', 'term': 'Animal', 'thai': 'สัตว์', 'altThai': null},
            {'id': 2, 'ipa': 'mǐː', 'paiboon': 'mǐi', 'term': 'Bear', 'thai': 'หมี', 'altThai': null},
            {'id': 3, 'ipa': 'nók', 'paiboon': 'nók', 'term': 'Bird', 'thai': 'นก', 'altThai': null},
            {'id': 4, 'ipa': 'mɛːw', 'paiboon': 'mɛɛo', 'term': 'Cat', 'thai': 'แมว', 'altThai': null},
            {'id': 5, 'ipa': 'wuːa', 'paiboon': 'wua', 'term': 'Cow / Bull', 'thai': 'วัว', 'altThai': null},
            {'id': 6, 'ipa': 'mǎː', 'paiboon': 'mǎa', 'term': 'Dog', 'thai': 'หมา', 'altThai': null},
            {'id': 7, 'ipa': 'plaː', 'paiboon': 'bplaa', 'term': 'Fish', 'thai': 'ปลา', 'altThai': null},
            {'id': 8, 'ipa': 'máː', 'paiboon': 'máa', 'term': 'Horse', 'thai': 'ม้า', 'altThai': null},
            {'id': 9, 'ipa': 'liŋ', 'paiboon': 'ling', 'term': 'Monkey', 'thai': 'ลิง', 'altThai': null},
            {'id': 10, 'ipa': 'nǔː', 'paiboon': 'nǔu', 'term': 'Mouse / Rat', 'thai': 'หนู', 'altThai': null}
        ]);

        localForageData = [
            [2, 1000, 1001, [1, 2]],
            [3, 1000, 1002, [1, 1]],
            [5, 1000, 1000, [0, 0]],
            [6, 1000, 1000, [0, 0]],
        ];
        allWordData = await loadWords();
        expect(allWordData).toEqual([
            {'id': 1, 'ipa': 'sàt', 'paiboon': 'sàt', 'term': 'Animal', 'thai': 'สัตว์', 'altThai': null},
            {'id': 2, 'ipa': 'mǐː', 'paiboon': 'mǐi', 'term': 'Bear', 'thai': 'หมี', date: 1000, dueDate: 1001, aspectScores: [1, 2], 'altThai': null},
            {'id': 3, 'ipa': 'nók', 'paiboon': 'nók', 'term': 'Bird', 'thai': 'นก', date: 1000, dueDate: 1002, aspectScores: [1, 1], 'altThai': null},
            {'id': 4, 'ipa': 'mɛːw', 'paiboon': 'mɛɛo', 'term': 'Cat', 'thai': 'แมว', 'altThai': null},
            {'id': 5, 'ipa': 'wuːa', 'paiboon': 'wua', 'term': 'Cow / Bull', 'thai': 'วัว', date: 1000, dueDate: 1000, aspectScores: [0, 0], 'altThai': null},
            {'id': 6, 'ipa': 'mǎː', 'paiboon': 'mǎa', 'term': 'Dog', 'thai': 'หมา', date: 1000, dueDate: 1000, aspectScores: [0, 0], 'altThai': null},
            {'id': 7, 'ipa': 'plaː', 'paiboon': 'bplaa', 'term': 'Fish', 'thai': 'ปลา', 'altThai': null},
            {'id': 8, 'ipa': 'máː', 'paiboon': 'máa', 'term': 'Horse', 'thai': 'ม้า', 'altThai': null},
            {'id': 9, 'ipa': 'liŋ', 'paiboon': 'ling', 'term': 'Monkey', 'thai': 'ลิง', 'altThai': null},
            {'id': 10, 'ipa': 'nǔː', 'paiboon': 'nǔu', 'term': 'Mouse / Rat', 'thai': 'หนู', 'altThai': null}
        ]);
    });
    it('saves progress to local storage', async () => {
        const setItem = jest.fn(() => Promise.resolve(null));
        jest.doMock('localforage', () => ({ setItem }));
        let words = [
            {'id': 1, 'ipa': 'sàt', 'paiboon': 'sàt', 'term': 'Animal', 'thai': 'สัตว์', 'altThai': null},
            {'id': 2, 'ipa': 'mǐː', 'paiboon': 'mǐi', 'term': 'Bear', 'thai': 'หมี', date: 1000, dueDate: 1001, aspectScores: [1, 2], 'altThai': null},
            {'id': 3, 'ipa': 'nók', 'paiboon': 'nók', 'term': 'Bird', 'thai': 'นก', date: 1000, dueDate: 1002, aspectScores: [1, 1], 'altThai': null},
            {'id': 4, 'ipa': 'mɛːw', 'paiboon': 'mɛɛo', 'term': 'Cat', 'thai': 'แมว', 'altThai': null},
            {'id': 5, 'ipa': 'wuːa', 'paiboon': 'wua', 'term': 'Cow / Bull', 'thai': 'วัว', date: 1000, dueDate: 1000, aspectScores: [0, 0], 'altThai': null},
            {'id': 6, 'ipa': 'mǎː', 'paiboon': 'mǎa', 'term': 'Dog', 'thai': 'หมา', date: 1000, dueDate: 1000, aspectScores: [0, 0], 'altThai': null},
            {'id': 7, 'ipa': 'plaː', 'paiboon': 'bplaa', 'term': 'Fish', 'thai': 'ปลา', 'altThai': null},
            {'id': 8, 'ipa': 'máː', 'paiboon': 'máa', 'term': 'Horse', 'thai': 'ม้า', 'altThai': null},
            {'id': 9, 'ipa': 'liŋ', 'paiboon': 'ling', 'term': 'Monkey', 'thai': 'ลิง', 'altThai': null},
            {'id': 10, 'ipa': 'nǔː', 'paiboon': 'nǔu', 'term': 'Mouse / Rat', 'thai': 'หนู', 'altThai': null}
        ];
        let expected = [
            [2, 1000, 1001, [1, 2]],
            [3, 1000, 1002, [1, 1]],
            [5, 1000, 1000, [0, 0]],
            [6, 1000, 1000, [0, 0]],
        ];
        const { saveProgress } = require('../Leitner');
        await saveProgress(words);
        expect(setItem).toHaveBeenCalledWith('progress', expected);
    });
    it('updates a words aspects scores', () => {
        let aspectScores;

        expect(updateWordAspect(aspectScores, 0, true)).toEqual([1, 0]);
        expect(aspectScores).toEqual();

        expect(updateWordAspect(aspectScores, 0, false)).toEqual([0, 0]);
        expect(updateWordAspect(aspectScores, 1, false)).toEqual([0, 0]);
        expect(updateWordAspect(aspectScores, 2, false)).toEqual([0, 0]);

        aspectScores = [3, 4];
        expect(updateWordAspect(aspectScores, 0, true)).toEqual([4, 4]);
        expect(updateWordAspect(aspectScores, 1, true)).toEqual([3, 5]);
        expect(updateWordAspect(aspectScores, 0, false)).toEqual([2, 4]);
        expect(updateWordAspect(aspectScores, 1, false)).toEqual([3, 3]);
    });
    it('applies item scores to their respective words', () => {
        let words = [
            { id: 1, aspectScores: [ 3, 4, 4 ] },
            { id: 2, aspectScores: [ 2, 2, 1 ] },
            { id: 3, aspectScores: [ 3, 3, 4 ] },
            { id: 4, aspectScores: [ 2, 4, 3 ] },
            { id: 5, aspectScores: [ 4, 4, 5 ] },
            { id: 6, aspectScores: [ 0, 0, 0 ] },
            { id: 7, aspectScores: [ 0, 0, 0 ] },
        ];
        let testScores = [
            { id: 3, aspect: 0, score: 1 },
            { id: 3, aspect: 1, score: -1 },
            { id: 3, aspect: 2, score: 1 },

            { id: 4, aspect: 0, score: -1 },
            { id: 4, aspect: 1, score: -1 },
            { id: 4, aspect: 2, score: -1 },

            { id: 5, aspect: 0, score: 1 },
            { id: 5, aspect: 1, score: 1 },
            { id: 5, aspect: 2, score: 1 },
        ];
        expect(applyScoresToWords(testScores, words, new Date(1500000000000))).toEqual([
            { id: 1, aspectScores: [ 3, 4, 4 ], date: 17361, dueDate: 17368 },
            { id: 2, aspectScores: [ 2, 2, 1 ], date: 17361, dueDate: 17362 },
            { id: 3, aspectScores: [ 4, 2, 5 ], date: 17361, dueDate: 17364 },
            { id: 4, aspectScores: [ 1, 3, 2 ], date: 17361, dueDate: 17362 },
            { id: 5, aspectScores: [ 5, 5, 5 ], date: 17361, dueDate: 9007199254758352 },
            { id: 6, aspectScores: [ 0, 0, 0 ], date: 17361, dueDate: 17361 },
            { id: 7, aspectScores: [ 0, 0, 0 ], date: 17361, dueDate: 17361 },
        ]);
    });
    it('gets the due date of a word based on its aspect scores', () => {
        const stages = [
            {sleep: 0},
            {sleep: 1},
            {sleep: 2},
            {sleep: 5},
            {sleep: 11},
            {sleep: 23}
        ];
        const getDueDateForAspects = createDueDateGeneratorForAspects(stages);

        expect(getDueDateForAspects( 1000, [0, 0, 0] )).toEqual(1000);
        expect(getDueDateForAspects( 1000, [1, 1, 1] )).toEqual(1001);
        expect(getDueDateForAspects( 1000, [2, 2, 2] )).toEqual(1002);
        expect(getDueDateForAspects( 1000, [3, 3, 3] )).toEqual(1005);
        expect(getDueDateForAspects( 1000, [4, 4, 4] )).toEqual(1011);
        expect(getDueDateForAspects( 1000, [5, 5, 5] )).toEqual(1023);

        expect(getDueDateForAspects( 1000, [1, 0, 0] )).toEqual(1000);
        expect(getDueDateForAspects( 1000, [0, 1, 0] )).toEqual(1000);
        expect(getDueDateForAspects( 1000, [0, 0, 1] )).toEqual(1000);

        expect(getDueDateForAspects( 1000, [2, 0, 0] )).toEqual(1000);
        expect(getDueDateForAspects( 1000, [0, 2, 0] )).toEqual(1000);
        expect(getDueDateForAspects( 1000, [0, 0, 2] )).toEqual(1000);

        expect(getDueDateForAspects( 1000, [4, 5, 1] )).toEqual(1001);
        expect(getDueDateForAspects( 1000, [5, 1, 4] )).toEqual(1001);
        expect(getDueDateForAspects( 1000, [1, 4, 5] )).toEqual(1001);
    });
    it('gets a list of outstanding words to test ordered by their lateness', () => {
        let words = [
            { id:  1, date: 1000, dueDate: 1001, aspectScores: [5, 4, 2] },
            { id:  2, date: 1000, dueDate: 1001, aspectScores: [5, 4, 3] },
            { id:  3, date: 1000, dueDate: 1001, aspectScores: [5, 4, 5] },

            { id:  4, date:  900, dueDate: 1001, aspectScores: [1, 1, 1] },
            { id:  5, date:  900, dueDate: 1001, aspectScores: [1, 1, 1] },
            { id:  6, date:  900, dueDate: 1001, aspectScores: [1, 1, 1] },

            { id:  7, date:  999, dueDate: 1001, aspectScores: [1, 1, 1] },
            { id:  8, date:  997, dueDate: 1001, aspectScores: [1, 1, 1] },
            { id:  9, date:  998, dueDate: 1001, aspectScores: [1, 1, 1] },

            { id: 10, date: 1000, dueDate: 1001, aspectScores: [5, 5, 5] },
            { id: 11, date: 1000, dueDate: 1004, aspectScores: [1, 2, 3] },

            { id: 12, date: 1000, dueDate:  951, aspectScores: [1, 2, 3] },
            { id: 13, date: 1000, dueDate:  951, aspectScores: [1, 2, 3] },
            { id: 14, date: 1000, dueDate:  951, aspectScores: [1, 2, 3] },

            { id: 15, date: 1000, dueDate:  802, aspectScores: [1, 2, 3] },
            { id: 16, date: 1000, dueDate:  800, aspectScores: [1, 2, 3] },
            { id: 17, date: 1000, dueDate:  801, aspectScores: [1, 2, 3] },

            { id: 18 },
            { id: 19 },
            { id: 20 },
            { id: 21 },
        ];

        let expected = [
            { id: 16, date: 1000, dueDate:  800, aspectScores: [1, 2, 3] },
            { id: 17, date: 1000, dueDate:  801, aspectScores: [1, 2, 3] },
            { id: 15, date: 1000, dueDate:  802, aspectScores: [1, 2, 3] },

            { id: 12, date: 1000, dueDate:  951, aspectScores: [1, 2, 3] },
            { id: 13, date: 1000, dueDate:  951, aspectScores: [1, 2, 3] },
            { id: 14, date: 1000, dueDate:  951, aspectScores: [1, 2, 3] },

            { id:  3, date: 1000, dueDate: 1001, aspectScores: [5, 4, 5] },
            { id:  2, date: 1000, dueDate: 1001, aspectScores: [5, 4, 3] },
            { id:  1, date: 1000, dueDate: 1001, aspectScores: [5, 4, 2] },

            { id:  4, date:  900, dueDate: 1001, aspectScores: [1, 1, 1] },
            { id:  5, date:  900, dueDate: 1001, aspectScores: [1, 1, 1] },
            { id:  6, date:  900, dueDate: 1001, aspectScores: [1, 1, 1] },

            { id:  8, date:  997, dueDate: 1001, aspectScores: [1, 1, 1] },
            { id:  9, date:  998, dueDate: 1001, aspectScores: [1, 1, 1] },
            { id:  7, date:  999, dueDate: 1001, aspectScores: [1, 1, 1] },
        ];
        expect(getOutstandingWords(words, 1001)).toEqual(expected);
    });
    it('refreshes a list of practice words', () => {
        let words = [
            { id: 1, date: 1000, dueDate: 9999, aspectScores: [5, 5]},
            { id: 2, date: 1000, dueDate: 1001, aspectScores: [0, 2]},
            { id: 3, date: 1000, dueDate: 1001, aspectScores: [1, 1]},
            { id: 4, },
            { id: 5, },
            { id: 6, },
            { id: 7, },
            { id: 8, },
            { id: 9, },
            { id: 10, },
        ];

        expect(refreshPracticeWords(words, 5, 1000)).toEqual([
            { id: 2, date: 1000, dueDate: 1001, aspectScores: [0, 2]},
            { id: 4, date: 1000, dueDate: 1000, aspectScores: [0, 0]},
            { id: 5, date: 1000, dueDate: 1000, aspectScores: [0, 0]},
            { id: 6, date: 1000, dueDate: 1000, aspectScores: [0, 0]},
            { id: 7, date: 1000, dueDate: 1000, aspectScores: [0, 0]},
        ]);
    });
    it('adds a word for practice', () => {
        const words = [
            { id:  1, date: 1000, dueDate: 1001, aspectScores: [0, 0] },
            { id:  2, date: 1000, dueDate: 1001, aspectScores: [0, 0] },
            { id:  3, date: 1000, dueDate: 1001, aspectScores: [0, 0] },
            { id:  4 },
            { id:  5 },
            { id:  6 },
        ];
        let practiceWords = words.filter(({date}) => date !== undefined);
        let newWord = words.find(({id}) => id === 5);

        expect(addPracticeWord(practiceWords, newWord, 1001)).toEqual([
            { id:  1, date: 1000, dueDate: 1001, aspectScores: [0, 0] },
            { id:  2, date: 1000, dueDate: 1001, aspectScores: [0, 0] },
            { id:  3, date: 1000, dueDate: 1001, aspectScores: [0, 0] },
            { id:  5, date: 1001, dueDate: 1001, aspectScores: [0, 0] },
        ]);

        // Ensure that words and the original words are not modified
        expect(words.find(({id}) => id === 5)).toEqual({ id: 5 });
        expect(newWord).toEqual({ id: 5 });
    });
    it('drops a word from practice', () => {
        const words = [
            { id:  1, date: 1000, dueDate: 1001, aspectScores: [0, 0] },
            { id:  2, date: 1000, dueDate: 1001, aspectScores: [0, 0] },
            { id:  3, date: 1000, dueDate: 1001, aspectScores: [0, 0] },
            { id:  5, date: 1001, dueDate: 1001, aspectScores: [0, 0] },
            { id:  6, date: 1001, dueDate: 1001, aspectScores: [1, 0] },
        ];

        let wordToRemove = words.find(({id}) => id === 5);

        expect(wordToRemove).toEqual({ id:  5, date: 1001, dueDate: 1001, aspectScores: [0, 0] });
        expect(removePracticeWord(words, wordToRemove)).toEqual([
            { id:  1, date: 1000, dueDate: 1001, aspectScores: [0, 0] },
            { id:  2, date: 1000, dueDate: 1001, aspectScores: [0, 0] },
            { id:  3, date: 1000, dueDate: 1001, aspectScores: [0, 0] },
            { id:  6, date: 1001, dueDate: 1001, aspectScores: [1, 0] },
        ]);

        // Words not already in the practice deck are not removed
        expect(removePracticeWord(words, {id: 999})).toEqual(words);
    });
    it('resets all words by removing all practice results', () => {
        const words = [
            { id:  1, date: 1000, dueDate: 1001, aspectScores: [0, 0] },
            { id:  2, date: 1000, dueDate: 1001, aspectScores: [0, 0] },
            { id:  3, date: 1000, dueDate: 1001, aspectScores: [0, 0] },
            { id:  5, date: 1001, dueDate: 1001, aspectScores: [0, 0] },
            { id:  6, date: 1001, dueDate: 1001, aspectScores: [1, 0] },
        ];
        const expectedResults = words.map(({id}) => ({ id }));

        expect(resetWords(words)).toEqual(expectedResults);
    });
    it('gets unseen/active/mastered status of a word', () => {
        const words = [
            { id:  1, date: 1000, dueDate: 1001, aspectScores: [5, 5] },
            { id:  2, date: 1000, dueDate: 1001, aspectScores: [5, 4] },
            { id:  3, date: 1000, dueDate: 1001, aspectScores: [0, 1] },
            { id:  5, date: 1001, dueDate: 1001, aspectScores: [0, 0] },
            { id:  6 },
            { id:  7, date: 1000, dueDate: 1002, aspectScores: [5, 5] },
            { id:  8, date: 1000, dueDate: 1002, aspectScores: [5, 4] },
            { id:  9, date: 1000, dueDate: 1002, aspectScores: [0, 1] },
            { id:  10, date: 1001, dueDate: 1002, aspectScores: [0, 0] },
        ];

        // ACTIVE: overdue
        expect(words.map(word => getRoughStatus(word, 1001))).toEqual([
            STATUS_MASTERED,
            STATUS_OVERDUE,
            STATUS_PRACTICE,
            STATUS_PRACTICE,
            STATUS_NONE,
            STATUS_MASTERED,
            STATUS_WAITING,
            STATUS_PRACTICE,
            STATUS_PRACTICE,
        ]);

        expect(words.map(word => getRoughStatus(word, 1004))).toEqual([
            STATUS_MASTERED,
            STATUS_OVERDUE,
            STATUS_PRACTICE,
            STATUS_PRACTICE,
            STATUS_NONE,
            STATUS_MASTERED,
            STATUS_OVERDUE,
            STATUS_PRACTICE,
            STATUS_PRACTICE,
        ]);

    });
    it('reduces a list of words into groups of like status', () => {
        const words = [
            { id:  1, date: 1000, dueDate: 1001, aspectScores: [5, 5] },
            { id:  2, date: 1000, dueDate: 1001, aspectScores: [5, 4] },
            { id:  3, date: 1000, dueDate: 1001, aspectScores: [0, 1] },
            { id:  5, date: 1001, dueDate: 1001, aspectScores: [0, 0] },
            { id:  6 },
            { id:  7, date: 1000, dueDate: 1002, aspectScores: [5, 5] },
            { id:  8, date: 1000, dueDate: 1002, aspectScores: [5, 4] },
            { id:  9, date: 1000, dueDate: 1002, aspectScores: [0, 1] },
            { id:  10, date: 1001, dueDate: 1002, aspectScores: [0, 0] },
        ];

        let sections = organizeByRoughStatus(words, 1001);
        expect(sections[STATUS_OVERDUE].map(({id}) => id)).toEqual([2]);
        expect(sections[STATUS_WAITING].map(({id}) => id)).toEqual([8]);
        expect(sections[STATUS_MASTERED].map(({id}) => id)).toEqual([1, 7]);
        expect(sections[STATUS_NONE].map(({id}) => id)).toEqual([6]);
        expect(sections[STATUS_PRACTICE].map(({id}) => id)).toEqual([3, 5, 9, 10]);

        sections = organizeByRoughStatus(words, 1005);
        expect(sections[STATUS_OVERDUE].map(({id}) => id)).toEqual([2, 8]);
        expect(sections[STATUS_WAITING].map(({id}) => id)).toEqual([]);
        expect(sections[STATUS_MASTERED].map(({id}) => id)).toEqual([1, 7]);
        expect(sections[STATUS_NONE].map(({id}) => id)).toEqual([6]);
        expect(sections[STATUS_PRACTICE].map(({id}) => id)).toEqual([3, 5, 9, 10]);
    });
    it('groups and filters a list of words into groups of like status', () => {
        const words = [
            { id:  1, date: 1000, dueDate: 1001, aspectScores: [5, 5] },
            { id:  2, date: 1000, dueDate: 1001, aspectScores: [5, 4] },
            { id:  3, date: 1000, dueDate: 1001, aspectScores: [0, 1] },
            { id:  5, date: 1001, dueDate: 1001, aspectScores: [0, 0] },
            { id:  6 },
            { id:  7, date: 1000, dueDate: 1002, aspectScores: [5, 5] },
            { id:  8, date: 1000, dueDate: 1002, aspectScores: [5, 4] },
            { id:  9, date: 1000, dueDate: 1002, aspectScores: [0, 1] },
            { id:  10, date: 1001, dueDate: 1002, aspectScores: [0, 0] },
        ];

        expect(filterByRoughStatus(words, 1001, []).map(({id}) => id)).toEqual([]);
        expect(filterByRoughStatus(words, 1001, [STATUS_PRACTICE]).map(({id}) => id)).toEqual([3, 5, 9, 10]);
        expect(filterByRoughStatus(words, 1001, [STATUS_NONE]).map(({id}) => id)).toEqual([6]);
        expect(filterByRoughStatus(words, 1001, [STATUS_MASTERED, STATUS_OVERDUE]).map(({id}) => id)).toEqual([1, 2, 7]);
        expect(filterByRoughStatus(words, 1001, [STATUS_OVERDUE, STATUS_MASTERED]).map(({id}) => id)).toEqual([1, 2, 7]);
        expect(filterByRoughStatus(words, 1001, [STATUS_OVERDUE, STATUS_WAITING, STATUS_MASTERED, STATUS_PRACTICE]).map(({id}) => id)).toEqual([1, 2, 3, 5, 7, 8, 9, 10]);
        expect(filterByRoughStatus(words, 1001, [STATUS_MASTERED, STATUS_NONE, STATUS_OVERDUE, STATUS_PRACTICE, STATUS_WAITING]).map(({id}) => id)).toEqual([1, 2, 3, 5, 6, 7, 8, 9, 10]);
    });
    it('merges a list of words with an updated queue', () => {
        let words = [
            { id:  1, date: 1000, dueDate: 1001, aspectScores: [5, 4, 2] },
            { id:  2, date: 1000, dueDate: 1001, aspectScores: [5, 4, 3] },
            { id:  3, date: 1000, dueDate: 1001, aspectScores: [5, 4, 5] },

            { id:  4, date:  900, dueDate: 1001, aspectScores: [1, 1, 1] },
            { id:  5, date:  900, dueDate: 1001, aspectScores: [1, 1, 1] },
            { id:  6, date:  900, dueDate: 1001, aspectScores: [1, 1, 1] },

            { id:  7, date:  999, dueDate: 1001, aspectScores: [1, 1, 1] },
            { id:  8, date:  997, dueDate: 1001, aspectScores: [1, 1, 1] },
            { id:  9, date:  998, dueDate: 1001, aspectScores: [1, 1, 1] },

            { id: 10, date: 1000, dueDate: 1001, aspectScores: [5, 5, 5] },
            { id: 11, date: 1000, dueDate: 1004, aspectScores: [1, 2, 3] },

            { id: 12, date: 1000, dueDate:  951, aspectScores: [1, 2, 3] },
            { id: 13, date: 1000, dueDate:  951, aspectScores: [1, 2, 3] },
            { id: 14, date: 1000, dueDate:  951, aspectScores: [1, 2, 3] },

            { id: 15 },
            { id: 16 },
            { id: 17 },

            { id: 18 },
            { id: 19 },
            { id: 20 },
            { id: 21 },
        ];
        let queue = [
            { id: 12, date: 1001, dueDate:  1001, aspectScores: [1, 2, 3] },
            { id: 13, date: 1001, dueDate:  1001, aspectScores: [1, 2, 3] },
            { id: 14, date: 1001, dueDate:  1001, aspectScores: [1, 2, 3] },

            { id: 15, date: 1001, dueDate: 1001, aspectScores: [0, 0, 0] },
            { id: 16, date: 1001, dueDate: 1001, aspectScores: [0, 0, 0] },
            { id: 17, date: 1001, dueDate: 1001, aspectScores: [0, 0, 0] },
        ];

        expect(updateProgress(words, queue)).toEqual([
            { id:  1, date: 1000, dueDate: 1001, aspectScores: [5, 4, 2] },
            { id:  2, date: 1000, dueDate: 1001, aspectScores: [5, 4, 3] },
            { id:  3, date: 1000, dueDate: 1001, aspectScores: [5, 4, 5] },

            { id:  4, date:  900, dueDate: 1001, aspectScores: [1, 1, 1] },
            { id:  5, date:  900, dueDate: 1001, aspectScores: [1, 1, 1] },
            { id:  6, date:  900, dueDate: 1001, aspectScores: [1, 1, 1] },

            { id:  7, date:  999, dueDate: 1001, aspectScores: [1, 1, 1] },
            { id:  8, date:  997, dueDate: 1001, aspectScores: [1, 1, 1] },
            { id:  9, date:  998, dueDate: 1001, aspectScores: [1, 1, 1] },

            { id: 10, date: 1000, dueDate: 1001, aspectScores: [5, 5, 5] },
            { id: 11, date: 1000, dueDate: 1004, aspectScores: [1, 2, 3] },

            { id: 12, date: 1001, dueDate:  1001, aspectScores: [1, 2, 3] },
            { id: 13, date: 1001, dueDate:  1001, aspectScores: [1, 2, 3] },
            { id: 14, date: 1001, dueDate:  1001, aspectScores: [1, 2, 3] },

            { id: 15, date: 1001, dueDate: 1001, aspectScores: [0, 0, 0] },
            { id: 16, date: 1001, dueDate: 1001, aspectScores: [0, 0, 0] },
            { id: 17, date: 1001, dueDate: 1001, aspectScores: [0, 0, 0] },

            { id: 18 },
            { id: 19 },
            { id: 20 },
            { id: 21 },
        ]);
    });
});