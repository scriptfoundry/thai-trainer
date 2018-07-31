describe('WordManager', () => {
    beforeEach((() => jest.resetModules()));
    afterEach(() => jest.resetModules());

    it('deserializes word data', () => {
        const { deserializeWord } = require('../WordManager');
        expect(deserializeWord([1,'Animals','Animal','สัตว์','sàt','sàt'])).toEqual({'id': 1, 'ipa': 'sàt', 'paiboon': 'sàt', 'section': 'Animals', 'term': 'Animal', 'thai': 'สัตว์'});
        expect(deserializeWord([1,'Animals','Animal','สัตว์','sàt','sàt','nothing','else','to'])).toEqual({'id': 1, 'ipa': 'sàt', 'paiboon': 'sàt', 'section': 'Animals', 'term': 'Animal', 'thai': 'สัตว์'});
    });
    it('serializes word', () => {
        const { serializeWord } = require('../WordManager');
        expect(serializeWord({'id': 1, 'ipa': 'sàt', 'paiboon': 'sàt', 'section': 'Animals', 'term': 'Animal', 'thai': 'สัตว์'})).toEqual([1,'Animals','Animal','สัตว์','sàt','sàt']);
        expect(serializeWord({'id': 1, 'ipa': 'sàt', 'paiboon': 'sàt', 'section': 'Animals', 'term': 'Animal', 'thai': 'สัตว์','do':'here'})).toEqual([1,'Animals','Animal','สัตว์','sàt','sàt']);
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
        ]);
        global.fetch = jest.fn(() => ({ json }));

        const { getWords } = require('../WordManager');
        let words = await getWords();

        expect(words).toEqual([
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
    });
});