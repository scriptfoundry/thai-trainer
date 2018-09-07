describe('WordManager', () => {
    beforeEach((() => jest.resetModules()));
    afterEach(() => jest.resetModules());

    it('deserializes word data', () => {
        const { deserializeWord } = require('../WordManager');
        expect(deserializeWord([1,'Animals','Animal','สัตว์','sàt','sàt'])).toEqual({'id': 1, 'ipa': 'sàt', 'paiboon': 'sàt', 'section': 'Animals', 'term': 'Animal', 'thai': 'สัตว์', 'altThai': null});
        expect(deserializeWord([1,'Animals','Animal','สัตว์','sàt','sàt','nothing','else','to'])).toEqual({'id': 1, 'ipa': 'sàt', 'paiboon': 'sàt', 'section': 'Animals', 'term': 'Animal', 'thai': 'สัตว์', 'altThai': 'nothing'});
    });
    it('gets all words from Persistence', async () => {
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
            [10,'Animals','Mouse / Rat','หนู','nǔː','nǔu', 'GARBAGE'],
            [256,'Verbs','to ask','ถาม','tʰǎːm','tǎam','ถาม?']
        ]);
        global.fetch = jest.fn(() => ({ json }));

        const { getWords } = require('../WordManager');
        let words = await getWords();

        expect(words).toEqual([
            {'id': 1, 'ipa': 'sàt', 'paiboon': 'sàt', 'section': 'Animals', 'term': 'Animal', 'thai': 'สัตว์', 'altThai': null},
            {'id': 2, 'ipa': 'mǐː', 'paiboon': 'mǐi', 'section': 'Animals', 'term': 'Bear', 'thai': 'หมี', 'altThai': null},
            {'id': 3, 'ipa': 'nók', 'paiboon': 'nók', 'section': 'Animals', 'term': 'Bird', 'thai': 'นก', 'altThai': null},
            {'id': 4, 'ipa': 'mɛːw', 'paiboon': 'mɛɛo', 'section': 'Animals', 'term': 'Cat', 'thai': 'แมว', 'altThai': null},
            {'id': 5, 'ipa': 'wuːa', 'paiboon': 'wua', 'section': 'Animals', 'term': 'Cow / Bull', 'thai': 'วัว', 'altThai': null},
            {'id': 6, 'ipa': 'mǎː', 'paiboon': 'mǎa', 'section': 'Animals', 'term': 'Dog', 'thai': 'หมา', 'altThai': null},
            {'id': 7, 'ipa': 'plaː', 'paiboon': 'bplaa', 'section': 'Animals', 'term': 'Fish', 'thai': 'ปลา', 'altThai': null},
            {'id': 8, 'ipa': 'máː', 'paiboon': 'máa', 'section': 'Animals', 'term': 'Horse', 'thai': 'ม้า', 'altThai': null},
            {'id': 9, 'ipa': 'liŋ', 'paiboon': 'ling', 'section': 'Animals', 'term': 'Monkey', 'thai': 'ลิง', 'altThai': null},
            {'id': 10, 'ipa': 'nǔː', 'paiboon': 'nǔu', 'section': 'Animals', 'term': 'Mouse / Rat', 'thai': 'หนู', 'altThai': 'GARBAGE'},
            {'id': 256, 'ipa': 'tʰǎːm', 'paiboon': 'tǎam', 'section': 'Verbs', 'term': 'to ask', 'thai': 'ถาม', 'altThai': 'ถาม?'},
        ]);
    });
});