import { createMiddleware } from 'redux-beacon';
import GoogleAnalyticsGtag, { trackEvent, trackPageView } from '@redux-beacon/google-analytics-gtag';
// import logger from '@redux-beacon/logger';
import debounceEvent from '@redux-beacon/debounce-event';

import { SETTINGS_INITIALIZE, SETTINGS_SETPRONUNCIATIONTYPE, SETTINGS_SETPRACTICELIMIT, SETTINGS_SETTESTLIMIT, SETTINGS_SETPRACTICEDISPLAYORDER, } from './settings';
import { VOICE_SETVOICES, VOICE_SETTHAIVOICE, VOICE_SETENGLISHVOICE } from './voice';
import { WORDS_REGISTERPRACTICEEND } from './words';
import { TEST_COMPLETETEST, TEST_SETTESTTYPE } from './tests';

export const TRACKING_TRACKROUTECHANGE = 'tracking/trackroutechange';
export const TRACKING_STARTPROCESS = 'tracking/startprocess';

const buildTestSummaryString = ({scores}) => {
    const summary = scores.reduce((carry, { score, aspect }) => {
        carry[aspect * 3 + score + 1] += 1;
        return carry;
    }, [0, 0, 0,   0, 0, 0,   0, 0, 0]);

    return `Test complete totals: ${scores.length}, a: ${ summary.slice(0, 3).join(',')}, b: ${ summary.slice(3, 6).join(',')}, c: ${ summary.slice(6,9).join(',') }`;
};
const buildTestStartString = ({ type, testWords }) => `Start test type: ${ type }, words ${ testWords.length }`;

const eventsMap = {
    [TRACKING_TRACKROUTECHANGE]: trackPageView((action) => ({ location: action.payload })),
    [TRACKING_STARTPROCESS]: trackEvent(({category, name}) => ({ action:'startprocess', category, label: `Start process: ${ category }:${ name }`  })),

    [SETTINGS_INITIALIZE]: trackEvent(() => ({ action:'initializesettings', category: 'Load', label: 'Load application' })),
    [VOICE_SETVOICES]: trackEvent(action => ({ action: 'setvoices', category: 'Load', label: `Available voices: Thai: ${ action.payload.thaiVoices.length }, English: ${ action.payload.englishVoices.length }` })),

    [SETTINGS_SETPRONUNCIATIONTYPE]: trackEvent(action => ({ action: 'changepronuncation', category: 'Settings', label: action.payload })),
    [SETTINGS_SETPRACTICELIMIT]: debounceEvent(1000, trackEvent(action => ({ action: 'setpracticewordlimit', category: 'Settings', label: `Set practice limit ${ action.payload.practiceWordLimit }` }))),
    [SETTINGS_SETTESTLIMIT]: debounceEvent(1000, trackEvent(action => ({ action: 'settestwordlimit', category: 'Settings', label: `Set test limit ${ action.payload.testingWordLimit }` }))),
    [SETTINGS_SETPRACTICEDISPLAYORDER]: debounceEvent(1000, trackEvent(action => ({ action: 'setpracticedisplayorder', category: 'Settings', label: action.payload.practiceOrder.join(', ') }))),

    [VOICE_SETTHAIVOICE]: trackEvent(action => ({ action: 'changethaivoice', category: 'Voice', label: `Set Thai voice: ${ action.payload.name }`})),
    [VOICE_SETENGLISHVOICE]: trackEvent(action => ({ action: 'changeenglishvoice', category: 'Voice', label: `Set English voice: ${ action.payload.name }`})),

    [WORDS_REGISTERPRACTICEEND]: trackEvent(action => ({ action: 'endpractice', category: 'Practice', label: `End ${ action.payload.type } practice: ${ action.payload.count }` })),
    [TEST_SETTESTTYPE]: trackEvent(action => ({ action: 'starttest', category: 'Test', label: buildTestStartString(action.payload) })),
    [TEST_COMPLETETEST]: trackEvent(action => ({ action: 'completetest', category: 'Test', label: buildTestSummaryString(action.payload) })),
};

export const middleware = createMiddleware(eventsMap, GoogleAnalyticsGtag('UA-124762758-1'), { /*logger*/ });

export const operations = {
    trackRouteChange: path => dispatch => dispatch({ type: TRACKING_TRACKROUTECHANGE, payload: path }),
    trackStartPracticeType: type => dispatch => dispatch({ type: TRACKING_STARTPROCESS, payload: { category: 'Practice', name: type } }),
};