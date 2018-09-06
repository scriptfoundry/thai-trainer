import { createMiddleware } from 'redux-beacon';
import GoogleAnalyticsGtag, { trackEvent, trackPageView } from '@redux-beacon/google-analytics-gtag';
import logger from '@redux-beacon/logger';
import debounceEvent from '@redux-beacon/debounce-event';

import { SETTINGS_INITIALIZE, SETTINGS_SETPRONUNCIATIONTYPE, SETTINGS_SETPRACTICELIMIT, SETTINGS_SETTESTLIMIT, SETTINGS_SETPRACTICEDISPLAYORDER, } from './settings';
import { VOICE_SETVOICES, VOICE_SETTHAIVOICE, VOICE_SETENGLISHVOICE } from './voice';
import { TEST_COMPLETETEST, TEST_SETTESTTYPE } from './tests';

export const TRACKING_TRACKROUTECHANGE = 'tracking/trackroutechange';

const buildTestSummaryString = ({scores}) => {
    const summary = scores.reduce((carry, { score, aspect }) => {
        carry[aspect * 3 + score + 1] += 1;
        return carry;
    }, [0, 0, 0,   0, 0, 0,   0, 0, 0]);

    return `Total: ${scores.length}, a: ${ summary.slice(0, 3).join(',')}, b: ${ summary.slice(3, 6).join(',')}, c: ${ summary.slice(6,9).join(',') }`;
};
const buildTestStartString = ({ type, testWords }) => `test type ${ type }, words ${ testWords.length }`;

const eventsMap = {
    [TRACKING_TRACKROUTECHANGE]: trackPageView((action) => ({ location: action.payload })),

    [SETTINGS_INITIALIZE]: trackEvent(() => ({ action:'initializesettings', category: 'Settings' })),

    [SETTINGS_SETPRONUNCIATIONTYPE]: trackEvent(action => ({ action: 'changepronuncation', category: 'Settings', label: action.payload })),
    [SETTINGS_SETPRACTICELIMIT]: debounceEvent(1000, trackEvent(action => ({ action: 'setpracticewordlimit', category: 'Settings', label: `Set practice limit ${ action.payload.practiceWordLimit }` }))),
    [SETTINGS_SETTESTLIMIT]: debounceEvent(1000, trackEvent(action => ({ action: 'settestwordlimit', category: 'Settings', label: `Set test limit ${ action.payload.testingWordLimit }` }))),
    [SETTINGS_SETPRACTICEDISPLAYORDER]: debounceEvent(1000, trackEvent(action => ({ action: 'setpracticedisplayorder', category: 'Settings', label: action.payload.practiceOrder.join(', ') }))),

    [VOICE_SETVOICES]: trackEvent(action => ({ action: 'setvoices', category: 'Settings', label: `Thai: ${ action.payload.thaiVoices.length }, English: ${ action.payload.englishVoices.length }` })),
    [VOICE_SETTHAIVOICE]: trackEvent(action => ({ action: 'changethaivoice', category: 'Settings', label: action.payload.name})),
    [VOICE_SETENGLISHVOICE]: trackEvent(action => ({ action: 'changeenglishvoice', category: 'Settings', label: action.payload.name})),

    [TEST_SETTESTTYPE]: trackEvent(action => ({ action: 'starttest', category: 'Test', label: buildTestStartString(action.payload) })),
    [TEST_COMPLETETEST]: trackEvent(action => ({ action: 'completetest', category: 'Test', label: buildTestSummaryString(action.payload) })),

};

export const middleware = createMiddleware(eventsMap, GoogleAnalyticsGtag('UA-124762758-1'), { logger });

export const operations = {
    trackRouteChange: path => dispatch => dispatch({ type: TRACKING_TRACKROUTECHANGE, payload: path })
};