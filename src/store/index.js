import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import { reducer as view, operations as viewOperations } from './view';
import { reducer as voice, operations as voiceOperations } from './voice';
import { reducer as settings, operations as settingsOperations } from './settings';
import { reducer as words, operations as wordOperations } from './words';

const rootReducer = combineReducers({
    view,
    voice,
    settings,
    words,
});

let enhancers = [];
const middleware = [
    thunk,
];
if (process.env.NODE_ENV === 'development') {
    const devToolsExtension = window.__REDUX_DEVTOOLS_EXTENSION__;

    if (typeof devToolsExtension === 'function') enhancers = [...enhancers, devToolsExtension()];
}
const rootEnhancer = compose( applyMiddleware(...middleware), ...enhancers );

const store = createStore(rootReducer, rootEnhancer);

export const operations = {
    ...viewOperations,
    ...voiceOperations,
    ...settingsOperations,
    ...wordOperations,
};

export default store;