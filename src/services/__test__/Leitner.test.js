import {
    STAGES,
    ASPECT_COMPREHENSION,
    ASPECT_READ,
    ASPECT_TRANSLATE,
    updateWordAspect,
    applyScoresToWords,
    createDueDateGeneratorForAspects,
    getOutstandingWords,
    refreshPracticeWords,
    addPracticeWord,
    removePracticeWord,
} from '../Leitner';

describe('Leitner', () => {
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
    it('updates a words aspects scores', () => {
        let word = { id: 123 };
        expect(updateWordAspect(word, 0, true)).toEqual({ id: 123, aspectScores: [1, 0, 0]});
        expect(word).toEqual({ id: 123 });

        expect(updateWordAspect(word, 0, false)).toEqual({ id: 123, aspectScores: [0, 0, 0]});
        expect(updateWordAspect(word, 1, false)).toEqual({ id: 123, aspectScores: [0, 0, 0]});
        expect(updateWordAspect(word, 2, false)).toEqual({ id: 123, aspectScores: [0, 0, 0]});

        word = { id: 123, aspectScores: [3, 4, 5]};
        expect(updateWordAspect(word, 0, true)).toEqual({ id: 123, aspectScores: [4, 4, 5]});
        expect(updateWordAspect(word, 1, true)).toEqual({ id: 123, aspectScores: [3, 5, 5]});
        expect(updateWordAspect(word, 2, true)).toEqual({ id: 123, aspectScores: [3, 4, 5]});
        expect(updateWordAspect(word, 0, false)).toEqual({ id: 123, aspectScores: [2, 4, 5]});
        expect(updateWordAspect(word, 1, false)).toEqual({ id: 123, aspectScores: [3, 3, 5]});
        expect(updateWordAspect(word, 2, false)).toEqual({ id: 123, aspectScores: [3, 4, 4]});
    });
    it('applies item scores to their respective words', () => {
        let words = [
            { id: 1, aspectScores: [ 3, 4, 4 ] },
            { id: 2, aspectScores: [ 2, 2, 1 ] },
            { id: 3, aspectScores: [ 3, 3, 4 ] },
            { id: 4, aspectScores: [ 2, 4, 3 ] },
            { id: 5, aspectScores: [ 4, 4, 5 ] },
            { id: 6, aspectScores: [ 0, 0, 0 ] },
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
        expect(applyScoresToWords(testScores, words)).toEqual([
            { id: 1, aspectScores: [ 3, 4, 4 ] },
            { id: 2, aspectScores: [ 2, 2, 1 ] },
            { id: 3, aspectScores: [ 4, 2, 5 ] },
            { id: 4, aspectScores: [ 1, 3, 2 ] },
            { id: 5, aspectScores: [ 5, 5, 5 ] },
            { id: 6, aspectScores: [ 0, 0, 0 ] },

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

        expect(getDueDateForAspects({ day: 1000, aspectScores: [0, 0, 0] })).toEqual(1000);
        expect(getDueDateForAspects({ day: 1000, aspectScores: [1, 1, 1] })).toEqual(1001);
        expect(getDueDateForAspects({ day: 1000, aspectScores: [2, 2, 2] })).toEqual(1002);
        expect(getDueDateForAspects({ day: 1000, aspectScores: [3, 3, 3] })).toEqual(1005);
        expect(getDueDateForAspects({ day: 1000, aspectScores: [4, 4, 4] })).toEqual(1011);
        expect(getDueDateForAspects({ day: 1000, aspectScores: [5, 5, 5] })).toEqual(1023);

        expect(getDueDateForAspects({ day: 1000, aspectScores: [1, 0, 0] })).toEqual(1000);
        expect(getDueDateForAspects({ day: 1000, aspectScores: [0, 1, 0] })).toEqual(1000);
        expect(getDueDateForAspects({ day: 1000, aspectScores: [0, 0, 1] })).toEqual(1000);

        expect(getDueDateForAspects({ day: 1000, aspectScores: [2, 0, 0] })).toEqual(1000);
        expect(getDueDateForAspects({ day: 1000, aspectScores: [0, 2, 0] })).toEqual(1000);
        expect(getDueDateForAspects({ day: 1000, aspectScores: [0, 0, 2] })).toEqual(1000);

        expect(getDueDateForAspects({ day: 1000, aspectScores: [4, 5, 1] })).toEqual(1001);
        expect(getDueDateForAspects({ day: 1000, aspectScores: [5, 1, 4] })).toEqual(1001);
        expect(getDueDateForAspects({ day: 1000, aspectScores: [1, 4, 5] })).toEqual(1001);
    });
    it('gets a list of outstanding words to test ordered by their lateness', () => {
        let words = [
            { id:  1, day: 1000, dueDate: 1001, aspectScores: [5, 4, 2] },
            { id:  2, day: 1000, dueDate: 1001, aspectScores: [5, 4, 3] },
            { id:  3, day: 1000, dueDate: 1001, aspectScores: [5, 4, 5] },

            { id:  4, day:  900, dueDate: 1001, aspectScores: [1, 1, 1] },
            { id:  5, day:  900, dueDate: 1001, aspectScores: [1, 1, 1] },
            { id:  6, day:  900, dueDate: 1001, aspectScores: [1, 1, 1] },

            { id:  7, day:  999, dueDate: 1001, aspectScores: [1, 1, 1] },
            { id:  8, day:  997, dueDate: 1001, aspectScores: [1, 1, 1] },
            { id:  9, day:  998, dueDate: 1001, aspectScores: [1, 1, 1] },

            { id: 10, day: 1000, dueDate: 1001, aspectScores: [5, 5, 5] },
            { id: 11, day: 1000, dueDate: 1004, aspectScores: [1, 2, 3] },

            { id: 12, day: 1000, dueDate:  951, aspectScores: [1, 2, 3] },
            { id: 13, day: 1000, dueDate:  951, aspectScores: [1, 2, 3] },
            { id: 14, day: 1000, dueDate:  951, aspectScores: [1, 2, 3] },

            { id: 15, day: 1000, dueDate:  802, aspectScores: [1, 2, 3] },
            { id: 16, day: 1000, dueDate:  800, aspectScores: [1, 2, 3] },
            { id: 17, day: 1000, dueDate:  801, aspectScores: [1, 2, 3] },

            { id: 18 },
            { id: 19 },
            { id: 20 },
            { id: 21 },
        ];

        let expected = [
            { id: 16, day: 1000, dueDate:  800, aspectScores: [1, 2, 3] },
            { id: 17, day: 1000, dueDate:  801, aspectScores: [1, 2, 3] },
            { id: 15, day: 1000, dueDate:  802, aspectScores: [1, 2, 3] },

            { id: 12, day: 1000, dueDate:  951, aspectScores: [1, 2, 3] },
            { id: 13, day: 1000, dueDate:  951, aspectScores: [1, 2, 3] },
            { id: 14, day: 1000, dueDate:  951, aspectScores: [1, 2, 3] },

            { id:  3, day: 1000, dueDate: 1001, aspectScores: [5, 4, 5] },
            { id:  2, day: 1000, dueDate: 1001, aspectScores: [5, 4, 3] },
            { id:  1, day: 1000, dueDate: 1001, aspectScores: [5, 4, 2] },

            { id:  4, day:  900, dueDate: 1001, aspectScores: [1, 1, 1] },
            { id:  5, day:  900, dueDate: 1001, aspectScores: [1, 1, 1] },
            { id:  6, day:  900, dueDate: 1001, aspectScores: [1, 1, 1] },

            { id:  8, day:  997, dueDate: 1001, aspectScores: [1, 1, 1] },
            { id:  9, day:  998, dueDate: 1001, aspectScores: [1, 1, 1] },
            { id:  7, day:  999, dueDate: 1001, aspectScores: [1, 1, 1] },
        ];
        expect(getOutstandingWords(words, 1001)).toEqual(expected);
    });
    it('refreshes a list of practice words', () => {
        let words = new Array(30).fill(0).map((v, id) => {
            return { id };
        });

        expect(refreshPracticeWords(words, 15)).toEqual(words.slice(0, 15));

        words = words.map(({v, id}) => {
            if (id >= 5 && id < 10) return { id, day: 1001, aspectScores: [ 5, 5, 5 ]};
            return { id };
        });
        expect(refreshPracticeWords(words, 15)).toEqual([...words.slice(0, 5), ...words.slice(10, 20)]);

        words = words.map(({v, id}) => {
            if (id < 5) return { id, day: 1001, aspectScores: [ 5, 5, 5 ]};
            if (id < 10) return { id, day: 1001, aspectScores: [ 0, 0, 0 ]};
            return { id };
        });
        expect(refreshPracticeWords(words, 15)).toEqual(words.slice(5, 20));

        words = words.map(({v, id}) => {
            if (id < 5) return { id, day: 1001, aspectScores: [ 5, 5, 5 ]};
            if (id < 25) return { id, day: 1001, aspectScores: [ 0, 0, 0 ]};
            return { id };
        });
        expect(refreshPracticeWords(words, 15)).toEqual(words.slice(5, 25));
    });
    it('adds a word for practice', () => {
        const words = [
            { id:  1, day: 1000, dueDate: 1001, aspectScores: [0, 0, 0] },
            { id:  2, day: 1000, dueDate: 1001, aspectScores: [0, 0, 0] },
            { id:  3, day: 1000, dueDate: 1001, aspectScores: [0, 0, 0] },
            { id:  4 },
            { id:  5 },
            { id:  6 },
        ];
        let practiceWords = words.filter(({day}) => day !== undefined);
        let newWord = words.find(({id}) => id === 5);

        expect(addPracticeWord(practiceWords, newWord, 1001)).toEqual([
            { id:  1, day: 1000, dueDate: 1001, aspectScores: [0, 0, 0] },
            { id:  2, day: 1000, dueDate: 1001, aspectScores: [0, 0, 0] },
            { id:  3, day: 1000, dueDate: 1001, aspectScores: [0, 0, 0] },
            { id:  5, day: 1001, dueDate: 1001, aspectScores: [0, 0, 0] },
        ]);

        // Ensure that words and the original words are not modified
        expect(words.find(({id}) => id === 5)).toEqual({ id: 5 });
        expect(newWord).toEqual({ id: 5 });
    });
    it('drops a word from practice', () => {
        const words = [
            { id:  1, day: 1000, dueDate: 1001, aspectScores: [0, 0, 0] },
            { id:  2, day: 1000, dueDate: 1001, aspectScores: [0, 0, 0] },
            { id:  3, day: 1000, dueDate: 1001, aspectScores: [0, 0, 0] },
            { id:  5, day: 1001, dueDate: 1001, aspectScores: [0, 0, 0] },
            { id:  6, day: 1001, dueDate: 1001, aspectScores: [1, 0, 0] },
        ];

        let wordToRemove = words.find(({id}) => id === 5);

        expect(wordToRemove).toEqual({ id:  5, day: 1001, dueDate: 1001, aspectScores: [0, 0, 0] });
        expect(removePracticeWord(words, wordToRemove)).toEqual([
            { id:  1, day: 1000, dueDate: 1001, aspectScores: [0, 0, 0] },
            { id:  2, day: 1000, dueDate: 1001, aspectScores: [0, 0, 0] },
            { id:  3, day: 1000, dueDate: 1001, aspectScores: [0, 0, 0] },
            { id:  6, day: 1001, dueDate: 1001, aspectScores: [1, 0, 0] },
        ]);

        // Words not already in the practice deck are not removed
        expect(removePracticeWord(words, {id: 999})).toEqual(words);
    });
});