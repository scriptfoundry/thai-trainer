describe('WordManager', () => {
    beforeEach((() => jest.resetModules()));
    afterEach(() => jest.resetModules());

    it('deserializes word data', () => {
        const { deserializeWord } = require('../WordManager');
        expect(deserializeWord([1,'Animal','สัตว์','sàt','sàt'])).toEqual({'id': 1, 'ipa': 'sàt', 'paiboon': 'sàt', 'term': 'Animal', 'thai': 'สัตว์', 'altThai': null});
        expect(deserializeWord([1,'Animal','สัตว์','sàt','sàt','nothing','else','to'])).toEqual({'id': 1, 'ipa': 'sàt', 'paiboon': 'sàt', 'term': 'Animal', 'thai': 'สัตว์', 'altThai': 'nothing'});
    });
    it('gets all words from Persistence', async () => {
        const json = jest.fn(() => [
            [1,'Animal','สัตว์','sàt','sàt'],
            [2,'Bear','หมี','mǐː','mǐi'],
            [3,'Bird','นก','nók','nók'],
            [4,'Cat','แมว','mɛːw','mɛɛo'],
            [5,'Cow / Bull','วัว','wuːa','wua'],
            [6,'Dog','หมา','mǎː','mǎa'],
            [7,'Fish','ปลา','plaː','bplaa'],
            [8,'Horse','ม้า','máː','máa'],
            [9,'Monkey','ลิง','liŋ','ling'],
            [10,'Mouse / Rat','หนู','nǔː','nǔu', 'GARBAGE'],
            [256,'to ask','ถาม','tʰǎːm','tǎam','ถาม?']
        ]);
        global.fetch = jest.fn(() => ({ json }));

        const { getWords } = require('../WordManager');
        let words = await getWords();

        expect(words).toEqual([
            {'id': 1, 'ipa': 'sàt', 'paiboon': 'sàt', 'term': 'Animal', 'thai': 'สัตว์', 'altThai': null},
            {'id': 2, 'ipa': 'mǐː', 'paiboon': 'mǐi', 'term': 'Bear', 'thai': 'หมี', 'altThai': null},
            {'id': 3, 'ipa': 'nók', 'paiboon': 'nók', 'term': 'Bird', 'thai': 'นก', 'altThai': null},
            {'id': 4, 'ipa': 'mɛːw', 'paiboon': 'mɛɛo', 'term': 'Cat', 'thai': 'แมว', 'altThai': null},
            {'id': 5, 'ipa': 'wuːa', 'paiboon': 'wua', 'term': 'Cow / Bull', 'thai': 'วัว', 'altThai': null},
            {'id': 6, 'ipa': 'mǎː', 'paiboon': 'mǎa', 'term': 'Dog', 'thai': 'หมา', 'altThai': null},
            {'id': 7, 'ipa': 'plaː', 'paiboon': 'bplaa', 'term': 'Fish', 'thai': 'ปลา', 'altThai': null},
            {'id': 8, 'ipa': 'máː', 'paiboon': 'máa', 'term': 'Horse', 'thai': 'ม้า', 'altThai': null},
            {'id': 9, 'ipa': 'liŋ', 'paiboon': 'ling', 'term': 'Monkey', 'thai': 'ลิง', 'altThai': null},
            {'id': 10, 'ipa': 'nǔː', 'paiboon': 'nǔu', 'term': 'Mouse / Rat', 'thai': 'หนู', 'altThai': 'GARBAGE'},
            {'id': 256, 'ipa': 'tʰǎːm', 'paiboon': 'tǎam', 'term': 'to ask', 'thai': 'ถาม', 'altThai': 'ถาม?'},
        ]);
    });
});