import { loadSettings, saveSettings } from '../services/Persistence';
import { PRONUNCIATIONTYPE_IPA, PRONUNCIATIONTYPE_PAIBOON } from '../services/WordManager';

const SETTINGS_SETPRONUNCIATIONTYPE = 'settings/setpronunciationtype';
const SETTINGS_SETPRACTICEDISPLAYORDER = 'settings/setpracticedisplayorder';
const SETTINGS_CHANGESETTINGS = 'settings/changesettings';
const SETTINGS_TOGGLEALLATONCE = 'settings/toggleallatonce';

const defaultState = {
    pronunciationType: PRONUNCIATIONTYPE_IPA,
    practiceWordLimit: 20,
    testingWordLimit: 20,
    practiceOrder: ['thai', 'pronunciation', 'term'],
    practiceAllAtOnce: false,
};

export const reducer = (state=defaultState, { type, payload }) => {
    if (type === SETTINGS_SETPRONUNCIATIONTYPE) return { ...state, pronunciationType: payload === PRONUNCIATIONTYPE_IPA ? PRONUNCIATIONTYPE_IPA : PRONUNCIATIONTYPE_PAIBOON };
    if (type === SETTINGS_TOGGLEALLATONCE) return { ...state, practiceAllAtOnce: payload.practiceAllAtOnce };
    if (type === SETTINGS_SETPRACTICEDISPLAYORDER) return { ...state, ...payload };
    if (type === SETTINGS_CHANGESETTINGS) return { ...state, ...payload };
    return state;
};

const changePronunciationType = (pronunciationType=null) => dispatch => {
    dispatch({ type: SETTINGS_SETPRONUNCIATIONTYPE, payload: pronunciationType });
    saveSettings({ pronunciationType });
};
const changePracticeDisplayOrder = ({practiceOrder, practiceAllAtOnce }) => dispatch => {
    if (practiceOrder) {
        dispatch({ type: SETTINGS_SETPRACTICEDISPLAYORDER, payload: { practiceOrder } });
        saveSettings({ practiceOrder });
    }
    else {
        dispatch({ type: SETTINGS_TOGGLEALLATONCE, payload: { practiceAllAtOnce } });
        saveSettings({ practiceAllAtOnce });
    }
};
const initializeSettings = () => async dispatch => {
    let {
        practiceWordLimit=defaultState.practiceWordLimit,
        pronunciationType=defaultState.pronunciationType,
        practiceAllAtOnce=defaultState.practiceAllAtOnce,
        practiceOrder=defaultState.practiceOrder,
        testingWordLimit=defaultState.testingWordLimit,
    } = await loadSettings();
    dispatch({ type: SETTINGS_CHANGESETTINGS, payload: { practiceWordLimit, practiceAllAtOnce, practiceOrder, pronunciationType, testingWordLimit } });
};
const changePracticeWordLimit = practiceWordLimit => dispatch => {
    dispatch({ type: SETTINGS_CHANGESETTINGS, payload: { practiceWordLimit }});
    saveSettings({ practiceWordLimit });
};
const changeTestingWordLimit = testingWordLimit => dispatch => {
    dispatch({ type: SETTINGS_CHANGESETTINGS, payload: { testingWordLimit }});
    saveSettings({ testingWordLimit });
};

export const operations = {
    changePracticeDisplayOrder,
    changePronunciationType,
    changePracticeWordLimit,
    changeTestingWordLimit,
    initializeSettings,
};