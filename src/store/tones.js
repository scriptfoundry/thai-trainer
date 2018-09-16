// import { buildRandomizedValuesQueue, getDayOfEpoch } from '../services/Utils';
import { loadTones } from '../services/Persistence';

export const TONES_INITIALIZE = 'tones/initialize';

const defaultState = {
    tonesmap: []
};
export const reducer = (state=defaultState, { type, payload }) => {
    switch (type) {
        case TONES_INITIALIZE:
        return { ...state, ...payload };

        default:
        return state;
    }
};

const initializeTones = () => async dispatch => {
    let tonesmap = await loadTones();
    tonesmap = tonesmap.map(({ cls, dur, ending, marker, examples }) => ({ cls, dur, ending, marker, examples }));

    dispatch({ type: TONES_INITIALIZE, payload: { tonesmap } });
};

export const operations = {
    initializeTones
};
