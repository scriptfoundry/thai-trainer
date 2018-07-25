import { getDayOfEpoch, calculateSuperMemo2Algorithm, calculateSuperMemo5Algorithm, calculateDifficulty, calculateEasiness, getEasiness } from '../SM2-plus-plus';

describe('SM2-plus service', () => {
    it('calculates easiness', () => {
        expect(getEasiness).toBeDefined();

        expect(getEasiness(1, 5)).toBeCloseTo(1.4, 3);
        expect(getEasiness(1.3, 5)).toBeCloseTo(1.4, 3);
        expect(getEasiness(1.3, 6)).toBeCloseTo(1.4, 3);

        expect(getEasiness(1.3, 3)).toBeCloseTo(1.16, 3);
        expect(getEasiness(2, 3)).toBeCloseTo(1.86, 3);
        expect(getEasiness(3, 3)).toBeCloseTo(2.86, 3);
        expect(getEasiness(4, 3)).toBeCloseTo(3.86, 3);
        expect(getEasiness(5, 3)).toBeCloseTo(4.86, 3);

        expect(getEasiness(1.3, 5)).toBeCloseTo(1.4, 3);
        expect(getEasiness(1.3, 4)).toBeCloseTo(1.3, 3);
        expect(getEasiness(1.3, 3)).toBeCloseTo(1.16, 3);
        expect(getEasiness(1.3, 2)).toBeCloseTo(0.98, 3);
        expect(getEasiness(1.3, 1)).toBeCloseTo(0.76, 3);
        expect(getEasiness(1.3, 0)).toBeCloseTo(0.50, 3);

        expect(getEasiness(1.3, 5)).toBeCloseTo(1.4, 3);
        expect(getEasiness(2, 4)).toBeCloseTo(2, 3);
        expect(getEasiness(3, 3)).toBeCloseTo(2.86, 3);
        expect(getEasiness(4, 2)).toBeCloseTo(3.68, 3);
        expect(getEasiness(5, 1)).toBeCloseTo(4.46, 3);

        expect(getEasiness(5, 5)).toBeCloseTo(5.1, 3);
    });
    it('calculates the days since the start of the epoch', () => {
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
    it('calculates progress using the supermemo2 algorithm', () => {
        const _Date = new Date(1532058300000);
        global.Date = jest.fn(() => _Date);

        const { calculateSuperMemo2Algorithm } = require('../SM2-plus-plus');
        const quality = 3;

        // let card = { repetitions: 0, easiness: 2.5, interval: 1 };
        let card = calculateSuperMemo2Algorithm(quality);
        expect(card).toEqual({'day':17732,'dueDate':17733,'easiness':2.5,'interval':1,'repetitions':1});

        card = calculateSuperMemo2Algorithm(2.9, card);
        expect(card).toEqual({'day':17732,'dueDate':17733,'easiness':2.5,'interval':1,'repetitions':0});

        card = calculateSuperMemo2Algorithm(4, card);
        expect(card).toEqual({'day':17732,'dueDate':17733,'easiness':2.5,'interval':1,'repetitions':1});

        card = calculateSuperMemo2Algorithm(quality, card);
        expect(card).toEqual({'day':17732,'dueDate':17738,'easiness':2.5,'interval':6,'repetitions':2});

        card = calculateSuperMemo2Algorithm(quality, card);
        expect(card).toEqual({'day':17732,'dueDate':17746,'easiness':2.36,'interval':14,'repetitions':3});

        card = calculateSuperMemo2Algorithm(quality, card);
        expect(card).toEqual({'day':17732,'dueDate':17763,'easiness':2.2199999999999998,'interval':31,'repetitions':4});

        card = calculateSuperMemo2Algorithm(2.9, card);
        expect(card).toEqual({'day':17732,'dueDate':17733,'easiness':2.2199999999999998,'interval':1,'repetitions':0});
    });
});