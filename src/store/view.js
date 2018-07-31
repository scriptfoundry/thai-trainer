import { STATUS_PRACTICE } from '../services/Leitner';
const VIEW_CHANGEVIEW = 'view/changeview';
const VIEW_CHANGEPREVIEWTAB = 'view_changepreviewtab';


const defaultState = {
    currentView: null,
    previewTab: STATUS_PRACTICE
};

export const reducer = (state=defaultState, { type, payload }) => {
    if (type === VIEW_CHANGEVIEW) return { ...state, currentView: payload };
    else if (type === VIEW_CHANGEPREVIEWTAB) return { ...state, previewTab: payload };

    return state;
};

const changeView = (view=null) => dispatch => dispatch({ type: VIEW_CHANGEVIEW, payload: view });
const changePreviewTab = tab => dispatch => dispatch({ type: VIEW_CHANGEPREVIEWTAB, payload: tab });

export const operations = {
    changeView,
    changePreviewTab,
};