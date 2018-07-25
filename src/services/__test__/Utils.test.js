describe('UtilsService', () => {
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
});