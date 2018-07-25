// /* Implementation of SuperMemo 2 spaced repetition algorithm (https://www.supermemo.com/english/ol/sm2.htm) */

import { makeClamp, compose } from './Utils';

const clamp1_3 = makeClamp(1.3);
const clamp5 = makeClamp(0, 5);
const getAdjustedGrade = grade => clamp5(5 - grade);

const calculateEasiness = (ef, adjustedGrade) => ef + (0.1 - adjustedGrade * (0.08 + adjustedGrade * 0.02));

export const getEasiness = compose(calculateEasiness, clamp1_3, getAdjustedGrade);

/**
 * Calculates the number of days since the "start of day" (4am) on Jan1 1970
 * @param {Date} date object having two methods: getTimezoneOffset and getTime
 * @returns { Number } The number of days since 4am on the start of the epoch
 */
export const getDayOfEpoch = (date = new Date()) => {
    // tsAdjustment is the number of ms difference between local time and UTC
    const tsAdjustment = date.getTimezoneOffset() * 60000;

    // timestamp is the number of ms since 1Jan1970 in the local timezone
    const timestamp = date.getTime() - tsAdjustment;

    //     Math.floor((timestamp - fourAM)) / twentyfourHours)
    return Math.floor((timestamp - 14400000) / 86400000);
};

/**
 * @static {Object} default shape of a card
 */
const defaultCard = { repetitions: 0, easiness: 2.5, interval: 1};
/**
 * Generates a new card based on a current card and its quality of answer
 * @param {Number} quality
 * @param {Object} card -- if none provided, a set of default values are used
 * @param {number} card.repetitions The number of times the card has been seen
 * @param {number} card.easiness A value (from 1.3) that describes how easy a card is to answer
 * @param {number} card.interval The number of days between tests
 */
export const calculateSuperMemo2Algorithm = (quality, card = defaultCard) => {
    let { repetitions, easiness, interval } = card;

    quality = clamp5(quality);
    repetitions = quality < 3 ? 0 : repetitions + 1;

    easiness = repetitions > 2 ? getEasiness(easiness, quality) : easiness;
    interval = repetitions > 2 ? Math.round(interval * easiness) : repetitions < 2 ? 1 : 6;

    const now = getDayOfEpoch();
    const dueDate = now + interval;

    return {
        day: now,
        dueDate,
        easiness,
        interval,
        repetitions,
    };
};

