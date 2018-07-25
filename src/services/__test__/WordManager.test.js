describe('WordManager', () => {
    beforeEach((() => jest.resetModules()));
    afterEach(() => jest.resetModules());

    it('loads words', async () => {
        let localForageData = null;

        const json = jest.fn(() => [
            [1,'Animals','Animal','สัตว์','sàt','sàt'],
            [2,'Animals','Bear','หมี','mǐː','mǐi'],
            [3,'Animals','Bird','นก','nók','nók'],
            [4,'Animals','Cat','แมว','mɛːw','mɛɛo'],
            [5,'Animals','Cow / Bull','วัว','wuːa','wua'],
            [6,'Animals','Dog','หมา','mǎː','mǎa'],
            [7,'Animals','Fish','ปลา','plaː','bplaa'],
            [8,'Animals','Horse','ม้า','máː','máa'],
            [9,'Animals','Monkey','ลิง','liŋ','ling'],
            [10,'Animals','Mouse / Rat','หนู','nǔː','nǔu'],
        ]);
        global.fetch = jest.fn(() => ({ json }));

        const getItem = jest.fn(() => localForageData);
        jest.doMock('localforage', () => ({ getItem }));

        const { loadLatestWords } = require('../WordManager');

        let words = await loadLatestWords();
        expect(fetch).toHaveBeenCalledWith('/data/allwords.json');
        expect(json).toHaveBeenCalled();
        expect(getItem).toHaveBeenCalledWith('progress');
        expect(words).toEqual( [
            {'id': 1, 'ipa': 'sàt', 'paiboon': 'sàt', 'section': 'Animals', 'term': 'Animal', 'thai': 'สัตว์'},
            {'id': 2, 'ipa': 'mǐː', 'paiboon': 'mǐi', 'section': 'Animals', 'term': 'Bear', 'thai': 'หมี'},
            {'id': 3, 'ipa': 'nók', 'paiboon': 'nók', 'section': 'Animals', 'term': 'Bird', 'thai': 'นก'},
            {'id': 4, 'ipa': 'mɛːw', 'paiboon': 'mɛɛo', 'section': 'Animals', 'term': 'Cat', 'thai': 'แมว'},
            {'id': 5, 'ipa': 'wuːa', 'paiboon': 'wua', 'section': 'Animals', 'term': 'Cow / Bull', 'thai': 'วัว'},
            {'id': 6, 'ipa': 'mǎː', 'paiboon': 'mǎa', 'section': 'Animals', 'term': 'Dog', 'thai': 'หมา'},
            {'id': 7, 'ipa': 'plaː', 'paiboon': 'bplaa', 'section': 'Animals', 'term': 'Fish', 'thai': 'ปลา'},
            {'id': 8, 'ipa': 'máː', 'paiboon': 'máa', 'section': 'Animals', 'term': 'Horse', 'thai': 'ม้า'},
            {'id': 9, 'ipa': 'liŋ', 'paiboon': 'ling', 'section': 'Animals', 'term': 'Monkey', 'thai': 'ลิง'},
            {'id': 10, 'ipa': 'nǔː', 'paiboon': 'nǔu', 'section': 'Animals', 'term': 'Mouse / Rat', 'thai': 'หนู'}
        ]);

        jest.clearAllMocks();

        localForageData = [ [ 2, 1000, 1002, 1.3, 2, 3 ], [ 3, 1000, 1001, 3.2, 1, 3 ] ];
        words = await loadLatestWords();
        expect(fetch).toHaveBeenCalledWith('/data/allwords.json');
        expect(json).toHaveBeenCalled();
        expect(getItem).toHaveBeenCalledWith('progress');
        expect(words).toEqual([
            {'id': 1, 'ipa': 'sàt', 'paiboon': 'sàt', 'section': 'Animals', 'term': 'Animal', 'thai': 'สัตว์'},
            {'id': 2, 'ipa': 'mǐː', 'paiboon': 'mǐi', 'section': 'Animals', 'term': 'Bear', 'thai': 'หมี', 'day': 1000, 'dueDate': 1002, 'easiness': 1.3, 'interval': 2, 'repetitions': 3},
            {'id': 3, 'ipa': 'nók', 'paiboon': 'nók', 'section': 'Animals', 'term': 'Bird', 'thai': 'นก', 'day': 1000, 'dueDate': 1001, 'easiness': 3.2, 'interval': 1, 'repetitions': 3},
            {'id': 4, 'ipa': 'mɛːw', 'paiboon': 'mɛɛo', 'section': 'Animals', 'term': 'Cat', 'thai': 'แมว'},
            {'id': 5, 'ipa': 'wuːa', 'paiboon': 'wua', 'section': 'Animals', 'term': 'Cow / Bull', 'thai': 'วัว'},
            {'id': 6, 'ipa': 'mǎː', 'paiboon': 'mǎa', 'section': 'Animals', 'term': 'Dog', 'thai': 'หมา'},
            {'id': 7, 'ipa': 'plaː', 'paiboon': 'bplaa', 'section': 'Animals', 'term': 'Fish', 'thai': 'ปลา'},
            {'id': 8, 'ipa': 'máː', 'paiboon': 'máa', 'section': 'Animals', 'term': 'Horse', 'thai': 'ม้า'},
            {'id': 9, 'ipa': 'liŋ', 'paiboon': 'ling', 'section': 'Animals', 'term': 'Monkey', 'thai': 'ลิง'},
            {'id': 10, 'ipa': 'nǔː', 'paiboon': 'nǔu', 'section': 'Animals', 'term': 'Mouse / Rat', 'thai': 'หนู'}
        ]);
    });
    it('saves words', () => {
        const setItem = jest.fn();
        jest.doMock('localforage', () => ({ setItem }));

        const { saveProgress } = require('../WordManager');

        saveProgress([
            {'id': 1, 'ipa': 'sàt', 'paiboon': 'sàt', 'section': 'Animals', 'term': 'Animal', 'thai': 'สัตว์'},
            {'id': 2, 'ipa': 'mǐː', 'paiboon': 'mǐi', 'section': 'Animals', 'term': 'Bear', 'thai': 'หมี'},
            {'id': 3, 'ipa': 'nók', 'paiboon': 'nók', 'section': 'Animals', 'term': 'Bird', 'thai': 'นก'},
            {'id': 4, 'ipa': 'mɛːw', 'paiboon': 'mɛɛo', 'section': 'Animals', 'term': 'Cat', 'thai': 'แมว'},
            {'id': 5, 'ipa': 'wuːa', 'paiboon': 'wua', 'section': 'Animals', 'term': 'Cow / Bull', 'thai': 'วัว'},
            {'id': 6, 'ipa': 'mǎː', 'paiboon': 'mǎa', 'section': 'Animals', 'term': 'Dog', 'thai': 'หมา'},
            {'id': 7, 'ipa': 'plaː', 'paiboon': 'bplaa', 'section': 'Animals', 'term': 'Fish', 'thai': 'ปลา'},
            {'id': 8, 'ipa': 'máː', 'paiboon': 'máa', 'section': 'Animals', 'term': 'Horse', 'thai': 'ม้า'},
            {'id': 9, 'ipa': 'liŋ', 'paiboon': 'ling', 'section': 'Animals', 'term': 'Monkey', 'thai': 'ลิง'},
            {'id': 10, 'ipa': 'nǔː', 'paiboon': 'nǔu', 'section': 'Animals', 'term': 'Mouse / Rat', 'thai': 'หนู'}
        ]);
        expect(setItem).toHaveBeenCalledWith('progress', []);

        jest.clearAllMocks();

        saveProgress([
            {'id': 1, 'ipa': 'sàt', 'paiboon': 'sàt', 'section': 'Animals', 'term': 'Animal', 'thai': 'สัตว์'},
            {'id': 2, 'ipa': 'mǐː', 'paiboon': 'mǐi', 'section': 'Animals', 'term': 'Bear', 'thai': 'หมี', 'day': 1000, 'dueDate': 1002, 'easiness': 1.3, 'interval': 2, 'repetitions': 3},
            {'id': 3, 'ipa': 'nók', 'paiboon': 'nók', 'section': 'Animals', 'term': 'Bird', 'thai': 'นก', 'day': 1000, 'dueDate': 1001, 'easiness': 3.2, 'interval': 1, 'repetitions': 3},
            {'id': 4, 'ipa': 'mɛːw', 'paiboon': 'mɛɛo', 'section': 'Animals', 'term': 'Cat', 'thai': 'แมว'},
            {'id': 5, 'ipa': 'wuːa', 'paiboon': 'wua', 'section': 'Animals', 'term': 'Cow / Bull', 'thai': 'วัว'},
            {'id': 6, 'ipa': 'mǎː', 'paiboon': 'mǎa', 'section': 'Animals', 'term': 'Dog', 'thai': 'หมา'},
            {'id': 7, 'ipa': 'plaː', 'paiboon': 'bplaa', 'section': 'Animals', 'term': 'Fish', 'thai': 'ปลา'},
            {'id': 8, 'ipa': 'máː', 'paiboon': 'máa', 'section': 'Animals', 'term': 'Horse', 'thai': 'ม้า'},
            {'id': 9, 'ipa': 'liŋ', 'paiboon': 'ling', 'section': 'Animals', 'term': 'Monkey', 'thai': 'ลิง'},
            {'id': 10, 'ipa': 'nǔː', 'paiboon': 'nǔu', 'section': 'Animals', 'term': 'Mouse / Rat', 'thai': 'หนู'}
        ]);
        expect(setItem).toHaveBeenCalledWith('progress', [
            [ 2, 1000, 1002, 1.3, 2, 3 ],
            [ 3, 1000, 1001, 3.2, 1, 3 ],
        ]);
    });
    it('builds words lists', () => {
        const { getCurrentWords } = require('../WordManager');
        let words = [
            {'id': 1, 'ipa': 'sàt', 'paiboon': 'sàt', 'section': 'Animals', 'term': 'Animal', 'thai': 'สัตว์'},
            {'id': 2, 'ipa': 'mǐː', 'paiboon': 'mǐi', 'section': 'Animals', 'term': 'Bear', 'thai': 'หมี'},
            {'id': 3, 'ipa': 'nók', 'paiboon': 'nók', 'section': 'Animals', 'term': 'Bird', 'thai': 'นก'},
            {'id': 4, 'ipa': 'mɛːw', 'paiboon': 'mɛɛo', 'section': 'Animals', 'term': 'Cat', 'thai': 'แมว'},
            {'id': 5, 'ipa': 'wuːa', 'paiboon': 'wua', 'section': 'Animals', 'term': 'Cow / Bull', 'thai': 'วัว'},
            {'id': 6, 'ipa': 'mǎː', 'paiboon': 'mǎa', 'section': 'Animals', 'term': 'Dog', 'thai': 'หมา'},
            {'id': 7, 'ipa': 'plaː', 'paiboon': 'bplaa', 'section': 'Animals', 'term': 'Fish', 'thai': 'ปลา'},
            {'id': 8, 'ipa': 'máː', 'paiboon': 'máa', 'section': 'Animals', 'term': 'Horse', 'thai': 'ม้า'},
            {'id': 9, 'ipa': 'liŋ', 'paiboon': 'ling', 'section': 'Animals', 'term': 'Monkey', 'thai': 'ลิง'},
            {'id': 10, 'ipa': 'nǔː', 'paiboon': 'nǔu', 'section': 'Animals', 'term': 'Mouse / Rat', 'thai': 'หนู'}
        ];
        expect(getCurrentWords(words, 1000, 5)).toEqual([
            {'id': 1, 'ipa': 'sàt', 'paiboon': 'sàt', 'section': 'Animals', 'term': 'Animal', 'thai': 'สัตว์'},
            {'id': 2, 'ipa': 'mǐː', 'paiboon': 'mǐi', 'section': 'Animals', 'term': 'Bear', 'thai': 'หมี'},
            {'id': 3, 'ipa': 'nók', 'paiboon': 'nók', 'section': 'Animals', 'term': 'Bird', 'thai': 'นก'},
            {'id': 4, 'ipa': 'mɛːw', 'paiboon': 'mɛɛo', 'section': 'Animals', 'term': 'Cat', 'thai': 'แมว'},
            {'id': 5, 'ipa': 'wuːa', 'paiboon': 'wua', 'section': 'Animals', 'term': 'Cow / Bull', 'thai': 'วัว'},
        ]);

        words = [
            {'id': 1, 'ipa': 'sàt', 'paiboon': 'sàt', 'section': 'Animals', 'term': 'Animal', 'thai': 'สัตว์'},
            {'id': 2, 'ipa': 'mǐː', 'paiboon': 'mǐi', 'section': 'Animals', 'term': 'Bear', 'thai': 'หมี', 'day': 1000, 'dueDate': 1002, 'easiness': 1.3, 'interval': 2, 'repetitions': 3},
            {'id': 3, 'ipa': 'nók', 'paiboon': 'nók', 'section': 'Animals', 'term': 'Bird', 'thai': 'นก', 'day': 1000, 'dueDate': 1001, 'easiness': 3.2, 'interval': 1, 'repetitions': 3},
            {'id': 4, 'ipa': 'mɛːw', 'paiboon': 'mɛɛo', 'section': 'Animals', 'term': 'Cat', 'thai': 'แมว'},
            {'id': 5, 'ipa': 'wuːa', 'paiboon': 'wua', 'section': 'Animals', 'term': 'Cow / Bull', 'thai': 'วัว'},
            {'id': 6, 'ipa': 'mǎː', 'paiboon': 'mǎa', 'section': 'Animals', 'term': 'Dog', 'thai': 'หมา'},
            {'id': 7, 'ipa': 'plaː', 'paiboon': 'bplaa', 'section': 'Animals', 'term': 'Fish', 'thai': 'ปลา'},
            {'id': 8, 'ipa': 'máː', 'paiboon': 'máa', 'section': 'Animals', 'term': 'Horse', 'thai': 'ม้า'},
            {'id': 9, 'ipa': 'liŋ', 'paiboon': 'ling', 'section': 'Animals', 'term': 'Monkey', 'thai': 'ลิง'},
            {'id': 10, 'ipa': 'nǔː', 'paiboon': 'nǔu', 'section': 'Animals', 'term': 'Mouse / Rat', 'thai': 'หนู'}
        ];

        expect(getCurrentWords(words, 1000, 5)).toEqual([
            {'id': 1, 'ipa': 'sàt', 'paiboon': 'sàt', 'section': 'Animals', 'term': 'Animal', 'thai': 'สัตว์'},
            {'id': 4, 'ipa': 'mɛːw', 'paiboon': 'mɛɛo', 'section': 'Animals', 'term': 'Cat', 'thai': 'แมว'},
            {'id': 5, 'ipa': 'wuːa', 'paiboon': 'wua', 'section': 'Animals', 'term': 'Cow / Bull', 'thai': 'วัว'},
            {'id': 6, 'ipa': 'mǎː', 'paiboon': 'mǎa', 'section': 'Animals', 'term': 'Dog', 'thai': 'หมา'},
            {'id': 7, 'ipa': 'plaː', 'paiboon': 'bplaa', 'section': 'Animals', 'term': 'Fish', 'thai': 'ปลา'},
        ]);

        expect(getCurrentWords(words, 1001, 5)).toEqual([
            {'id': 1, 'ipa': 'sàt', 'paiboon': 'sàt', 'section': 'Animals', 'term': 'Animal', 'thai': 'สัตว์'},
            {'id': 3, 'ipa': 'nók', 'paiboon': 'nók', 'section': 'Animals', 'term': 'Bird', 'thai': 'นก', 'day': 1000, 'dueDate': 1001, 'easiness': 3.2, 'interval': 1, 'repetitions': 3},
            {'id': 4, 'ipa': 'mɛːw', 'paiboon': 'mɛɛo', 'section': 'Animals', 'term': 'Cat', 'thai': 'แมว'},
            {'id': 5, 'ipa': 'wuːa', 'paiboon': 'wua', 'section': 'Animals', 'term': 'Cow / Bull', 'thai': 'วัว'},
            {'id': 6, 'ipa': 'mǎː', 'paiboon': 'mǎa', 'section': 'Animals', 'term': 'Dog', 'thai': 'หมา'},
        ]);

        expect(getCurrentWords(words, 1002, 5)).toEqual([
            {'id': 1, 'ipa': 'sàt', 'paiboon': 'sàt', 'section': 'Animals', 'term': 'Animal', 'thai': 'สัตว์'},
            {'id': 2, 'ipa': 'mǐː', 'paiboon': 'mǐi', 'section': 'Animals', 'term': 'Bear', 'thai': 'หมี', 'day': 1000, 'dueDate': 1002, 'easiness': 1.3, 'interval': 2, 'repetitions': 3},
            {'id': 3, 'ipa': 'nók', 'paiboon': 'nók', 'section': 'Animals', 'term': 'Bird', 'thai': 'นก', 'day': 1000, 'dueDate': 1001, 'easiness': 3.2, 'interval': 1, 'repetitions': 3},
            {'id': 4, 'ipa': 'mɛːw', 'paiboon': 'mɛɛo', 'section': 'Animals', 'term': 'Cat', 'thai': 'แมว'},
            {'id': 5, 'ipa': 'wuːa', 'paiboon': 'wua', 'section': 'Animals', 'term': 'Cow / Bull', 'thai': 'วัว'},
        ]);

    });
});