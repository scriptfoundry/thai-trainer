import { loadSettings, saveSettings } from '../services/Persistence';
import { PRONUNCIATIONTYPE_IPA, PRONUNCIATIONTYPE_PAIBOON } from '../services/WordManager';

const SETTINGS_SETPRONUNCIATIONTYPE = 'settings/setpronunciationtype';
const defaultState = {
    pronunciationType: PRONUNCIATIONTYPE_IPA,
    practiceWordLimit: 20
};

export const reducer = (state=defaultState, { type, payload }) => {
    if (type === SETTINGS_SETPRONUNCIATIONTYPE) return { ...state, pronunciationType: payload === PRONUNCIATIONTYPE_IPA ? PRONUNCIATIONTYPE_IPA : PRONUNCIATIONTYPE_PAIBOON };

    return state;
};

const changePronunciationType = (pronunciationType=null) => dispatch => {
    dispatch({ type: SETTINGS_SETPRONUNCIATIONTYPE, payload: pronunciationType });
    saveSettings({ pronunciationType });
};
const initializeSettings = () => async dispatch => {
    let { pronunciationType=PRONUNCIATIONTYPE_IPA } = await loadSettings();
    dispatch({ type: SETTINGS_SETPRONUNCIATIONTYPE, payload: pronunciationType });
};

export const operations = {
    changePronunciationType,
    initializeSettings,
};