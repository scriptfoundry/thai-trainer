import { loadSettings, saveSettings } from '../services/Persistence';
import { PRONUNCIATIONTYPE_IPA, PRONUNCIATIONTYPE_PAIBOON } from '../services/WordManager';

const SETTINGS_INITIALIZE = 'settings/initialize';
const SETTINGS_SETPRONUNCIATIONTYPE = 'settings/setpronunciationtype';
const SETTINGS_SETPRACTICEDISPLAYORDER = 'settings/setpracticedisplayorder';
const SETTINGS_TOGGLEALLATONCE = 'settings/toggleallatonce';

const defaultState = {
    pronunciationType: PRONUNCIATIONTYPE_IPA,
    practiceWordLimit: 20,
    practiceOrder: ['term', 'thai', 'pronunciation'],
    practiceAllAtOnce: false,
};

export const reducer = (state=defaultState, { type, payload }) => {
    if (type === SETTINGS_SETPRONUNCIATIONTYPE) return { ...state, pronunciationType: payload === PRONUNCIATIONTYPE_IPA ? PRONUNCIATIONTYPE_IPA : PRONUNCIATIONTYPE_PAIBOON };
    if (type === SETTINGS_TOGGLEALLATONCE) return { ...state, practiceAllAtOnce: payload.practiceAllAtOnce };
    if (type === SETTINGS_SETPRACTICEDISPLAYORDER) return { ...state, ...payload };
    if (type === SETTINGS_INITIALIZE) return { ...state, ...payload };
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
    let { pronunciationType=PRONUNCIATIONTYPE_IPA, practiceAllAtOnce=false, practiceOrder=['term', 'thai', 'pronunciation'] } = await loadSettings();
    dispatch({ type: SETTINGS_INITIALIZE, payload: { practiceAllAtOnce, practiceOrder, pronunciationType } });
};

export const operations = {
    changePracticeDisplayOrder,
    changePronunciationType,
    initializeSettings,
};