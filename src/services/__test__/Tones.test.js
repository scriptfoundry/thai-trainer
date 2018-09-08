import { getComponents, isLow, isMid, isHigh, isThai, TONE_CLASS_LOW, TONE_CLASS_MID, TONE_CLASS_HIGH } from '../Tones';

describe('Tones service', () => {
    it('exists', () => {
        expect(TONE_CLASS_HIGH).toEqual(1);
        expect(TONE_CLASS_MID).toEqual(2);
        expect(TONE_CLASS_LOW).toEqual(3);
    });
    it('can detect thai', () => {
        expect(isThai('')).toBe(false);
        expect(isThai('a')).toBe(false);
        expect(isThai('test')).toBe(false);
        expect(isThai('ม')).toBe(true);
        expect(isThai('โดยเฉพาะ')).toBe(true);
        expect(isThai('a โดยเฉพาะ')).toBe(true);
    });
    it('knows character classes', () => {
        const allLows = 'คฅฆงชซฌญฑฒณทธนพฟภมยรลวฬฮ'.split('');
        const allMids = 'กจฎฏดตบปอ'.split('');
        const allHighs = 'ฉขฃฐถผฝศษสห'.split('');
        const allZeros = '[๋๊้่๎ํ์็ฺูุืึีิำั]'.split('');

        allLows.forEach(char => expect(isLow(char)).toBe(true));
        allMids.forEach(char => expect(isLow(char)).toBe(false));
        allHighs.forEach(char => expect(isLow(char)).toBe(false));
        allZeros.forEach(char => expect(isLow(char)).toBe(false));

        allLows.forEach(char => expect(isMid(char)).toBe(false));
        allMids.forEach(char => expect(isMid(char)).toBe(true));
        allHighs.forEach(char => expect(isMid(char)).toBe(false));
        allZeros.forEach(char => expect(isMid(char)).toBe(false));

        allLows.forEach(char => expect(isHigh(char)).toBe(false));
        allMids.forEach(char => expect(isHigh(char)).toBe(false));
        allHighs.forEach(char => expect(isHigh(char)).toBe(true));
        allZeros.forEach(char => expect(isHigh(char)).toBe(false));
    });
    it('converts a simple thai word to constituent parts', () => {
        expect(getComponents('')).toEqual([]);
        expect(getComponents('มา')).toEqual([
            ['ม', TONE_CLASS_LOW],
            ['า']
        ]);
        expect(getComponents('คน')).toEqual([
            ['ค', TONE_CLASS_LOW],
            ['น', TONE_CLASS_LOW],
        ]);
        expect(getComponents('ออก')).toEqual([
            ['อ', TONE_CLASS_MID],
            ['อ', TONE_CLASS_MID],
            ['ก', TONE_CLASS_MID],
        ]);
        expect(getComponents('โดยเฉพาะ')).toEqual([
            ['โ'],
            ['ด', TONE_CLASS_MID],
            ['ย', TONE_CLASS_LOW],
            ['เ'],
            ['ฉ', TONE_CLASS_HIGH],
            ['พ', TONE_CLASS_LOW],
            ['า'],
            ['ะ'],
        ]);
    });
    it('converts a simple thai word to constituent parts', () => {
        expect(getComponents('ง่าย')).toEqual([
            ['ง่', TONE_CLASS_LOW],
            ['า'],
            ['ย', TONE_CLASS_LOW],
        ]);
        expect(getComponents('เชื่อ')).toEqual([
            ['เ'],
            ['ชื่', TONE_CLASS_LOW],
            ['อ', TONE_CLASS_MID],
        ]);
        expect(getComponents('ความรู้สึก')).toEqual([
            ['ค', TONE_CLASS_LOW],
            ['ว', TONE_CLASS_LOW],
            ['า'],
            ['ม', TONE_CLASS_LOW],
            ['รู้', TONE_CLASS_LOW],
            ['สึ', TONE_CLASS_HIGH],
            ['ก', TONE_CLASS_MID],
        ]);
        expect(getComponents('เอ็ม')).toEqual([
            ['เ'],
            ['อ็', TONE_CLASS_MID],
            ['ม', TONE_CLASS_LOW],
        ]);
        expect(getComponents('สัตว์')).toEqual([
            ['สั', TONE_CLASS_HIGH],
            ['ต', TONE_CLASS_MID],
            ['ว์', TONE_CLASS_LOW],
        ]);
        expect(getComponents('ไม่ว่า')).toEqual([
            ['ไ'],
            ['ม่', TONE_CLASS_LOW],
            ['ว่', TONE_CLASS_LOW],
            ['า'],
        ]);
        expect(getComponents('ทั้งนี้')).toEqual([
            ['ทั้', TONE_CLASS_LOW],
            ['ง', TONE_CLASS_LOW],
            ['นี้', TONE_CLASS_LOW],
        ]);
        expect(getComponents('ผู้นำ')).toEqual([
            ['ผู้', TONE_CLASS_HIGH],
            ['นำ', TONE_CLASS_LOW],
        ]);
        expect(getComponents('ต่ำ')).toEqual([
            ['ต่ำ', TONE_CLASS_MID],
        ]);
        expect(getComponents('พันธุ์')).toEqual([
            ['พั', TONE_CLASS_LOW],
            ['น', TONE_CLASS_LOW],
            ['ธุ์', TONE_CLASS_LOW],
        ]);
        expect(getComponents('พูดถึง')).toEqual([
            ['พู', TONE_CLASS_LOW],
            ['ด', TONE_CLASS_MID],
            ['ถึ', TONE_CLASS_HIGH],
            ['ง', TONE_CLASS_LOW],
        ]);
        expect(getComponents('เดี๋ยวนี้')).toEqual([
            ['เ'],
            ['ดี๋', TONE_CLASS_MID],
            ['ย', TONE_CLASS_LOW],
            ['ว', TONE_CLASS_LOW],
            ['นี้', TONE_CLASS_LOW],
        ]);
        expect(getComponents('ภูมิ')).toEqual([
            ['ภู', TONE_CLASS_LOW],
            ['มิ', TONE_CLASS_LOW],
        ]);
        expect(getComponents('จ๊ะ')).toEqual([
            ['จ๊', TONE_CLASS_MID],
            ['ะ'],
        ]);
    });
});