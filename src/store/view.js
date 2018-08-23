import { STATUS_PRACTICE } from '../services/Leitner';
import { TEST_SETTESTTYPE, TEST_COMPLETETEST, TEST_COMMITTESTANDCLOSE } from './tests';
const VIEW_CHANGESUBVIEW = 'view/changesubview';
const VIEW_CHANGEPREVIEWFILTER = 'view_changepreviewfilter';

const defaultState = {
    currentView: null,
    subview: null,
    previewFilter: [STATUS_PRACTICE]
};

export const reducer = (state=defaultState, { type, payload }) => {
    if (type === VIEW_CHANGESUBVIEW) return { ...state, subview: payload };
    if (type === TEST_SETTESTTYPE ) return { ...state, currentView: 'test' };
    if (type === TEST_COMPLETETEST) return { ...state, currentView: 'testresults' };
    if (type === VIEW_CHANGEPREVIEWFILTER) {
        let previewFilter = state.previewFilter.filter(status => status !== payload);
        if (previewFilter.length === state.previewFilter.length) previewFilter.push(payload);

        return { ...state, previewFilter };
    }
    if (type === TEST_COMMITTESTANDCLOSE) return { ...state, currentView: 'progress' };

    return state;
};

const changeSubview = subview => dispatch => dispatch({ type: VIEW_CHANGESUBVIEW, payload: subview});
const togglePreviewFilterStatus = status => dispatch => dispatch({ type: VIEW_CHANGEPREVIEWFILTER, payload: status });

export const operations = {
    changeSubview,
    togglePreviewFilterStatus,
};