const VIEW_CHANGEVIEW = 'view/changeview';

const defaultState = {
    currentView: null
};

export const reducer = (state=defaultState, { type, payload }) => {
    if (type === VIEW_CHANGEVIEW) return { ...state, currentView: payload };

    return state;
};

const changeView = (view=null) => dispatch => dispatch({ type: VIEW_CHANGEVIEW, payload: view });

export const operations = {
    changeView
};