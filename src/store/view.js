import { WORDS_CLOSEPRACTICE } from './words';
import { STATUS_PRACTICE, STATUS_OVERDUE, STATUS_WAITING } from '../services/Leitner';
const VIEW_APPLICATIONREADY = 'view_applicationready';
const VIEW_CHANGESUBVIEW = 'view/changesubview';
const VIEW_CHANGEPREVIEWFILTER = 'view_changepreviewfilter';

const defaultState = {
    applicationReady: false,
    currentView: null,
    subview: null,
    previewFilter: [STATUS_PRACTICE, STATUS_OVERDUE, STATUS_WAITING]
};

export const reducer = (state=defaultState, { type, payload }) => {
    if (type === VIEW_CHANGESUBVIEW) return { ...state, subview: payload };
    if (type === WORDS_CLOSEPRACTICE) return { ...state, subview: null };
    if (type === VIEW_CHANGEPREVIEWFILTER) {
        let previewFilter = state.previewFilter.filter(status => status !== payload);
        if (previewFilter.length === state.previewFilter.length) previewFilter.push(payload);

        return { ...state, previewFilter };
    }
    if (type === VIEW_APPLICATIONREADY) return { ...state, applicationReady: true };

    return state;
};

const setApplicationReady = () => dispatch => dispatch({ type: VIEW_APPLICATIONREADY });
const changeSubview = subview => dispatch => dispatch({ type: VIEW_CHANGESUBVIEW, payload: subview});
const togglePreviewFilterStatus = status => dispatch => dispatch({ type: VIEW_CHANGEPREVIEWFILTER, payload: status });

export const operations = {
    changeSubview,
    setApplicationReady,
    togglePreviewFilterStatus,
};