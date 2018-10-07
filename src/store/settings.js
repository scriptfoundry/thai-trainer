import { loadSettings, saveSettings, resetProgressData, } from '../services/Persistence';
import { PRONUNCIATIONTYPE_IPA, PRONUNCIATIONTYPE_PAIBOON } from '../services/WordManager';

export const SETTINGS_INITIALIZE = 'settings/initialize';
export const SETTINGS_SETPRONUNCIATIONTYPE = 'settings/setpronunciationtype';
export const SETTINGS_SETPRACTICELIMIT = 'settings/setpracticelimit';
export const SETTINGS_SETTESTLIMIT = 'settings/settestlimit';
export const SETTINGS_SETPRACTICEDISPLAYORDER = 'settings/setpracticedisplayorder';
export const SETTINGS_RESETPROGRESS = 'settings/resetprogress';
const SETTINGS_TOGGLEALLATONCE = 'settings/toggleallatonce';
const SETTINGS_TOGGLECHARACTERCLASSES = 'settings/togglecharacterclasses';
const SETTINGS_TOGGLERESETPROGRESS = 'settings/toggleresetprogress';

const defaultState = {
    pronunciationType: PRONUNCIATIONTYPE_IPA,
    practiceWordLimit: 15,
    testingWordLimit: 20,
    practiceOrder: ['thai', 'pronunciation', 'term'],
    practiceAllAtOnce: false,
    showCharacterClasses: true,
    resetProgressVisible: false,
};

export const reducer = (state=defaultState, { type, payload }) => {
    switch(type) {
        case SETTINGS_INITIALIZE:
        case SETTINGS_SETPRACTICELIMIT:
        case SETTINGS_SETTESTLIMIT:
        case SETTINGS_SETPRACTICEDISPLAYORDER:
        case SETTINGS_TOGGLEALLATONCE:
        case SETTINGS_TOGGLECHARACTERCLASSES:
        case SETTINGS_TOGGLERESETPROGRESS:
        case SETTINGS_RESETPROGRESS:
        return { ...state, ...payload };

        case SETTINGS_SETPRONUNCIATIONTYPE:
        return { ...state, pronunciationType: payload === PRONUNCIATIONTYPE_IPA ? PRONUNCIATIONTYPE_IPA : PRONUNCIATIONTYPE_PAIBOON };

        default:
        return state;
    }
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
        showCharacterClasses=defaultState.showCharacterClasses,
        testingWordLimit=defaultState.testingWordLimit,
    } = await loadSettings();
    dispatch({ type: SETTINGS_INITIALIZE, payload: { practiceWordLimit, practiceAllAtOnce, practiceOrder, pronunciationType, showCharacterClasses, testingWordLimit } });
};
const changePracticeWordLimit = practiceWordLimit => dispatch => {
    dispatch({ type: SETTINGS_SETPRACTICELIMIT, payload: { practiceWordLimit }});
    saveSettings({ practiceWordLimit });
};
const changeTestingWordLimit = testingWordLimit => dispatch => {
    dispatch({ type: SETTINGS_SETTESTLIMIT, payload: { testingWordLimit }});
    saveSettings({ testingWordLimit });
};
const toggleCharacterClasses = () => (dispatch, getState) => {
    let showCharacterClasses = getState().settings.showCharacterClasses === false;
    dispatch({ type: SETTINGS_TOGGLECHARACTERCLASSES, payload: { showCharacterClasses }});
    saveSettings({ showCharacterClasses });
};
const toggleResetProgress = () => (dispatch, getState) => {
    let resetProgressVisible = getState().settings.resetProgressVisible === false;
    dispatch({ type: SETTINGS_TOGGLERESETPROGRESS, payload: { resetProgressVisible } });
};
const resetProgress = () => async dispatch => {
    await resetProgressData();
    dispatch({ type: SETTINGS_RESETPROGRESS, payload: { resetProgressVisible: false }});
};

export const operations = {
    changePracticeDisplayOrder,
    changePronunciationType,
    changePracticeWordLimit,
    changeTestingWordLimit,
    initializeSettings,
    toggleCharacterClasses,
    toggleResetProgress,
    resetProgress,
};