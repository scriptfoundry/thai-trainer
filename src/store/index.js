import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import { reducer as view, operations as viewOperations } from './view';
import { reducer as voice, operations as voiceOperations } from './voice';
import { reducer as settings, operations as settingsOperations } from './settings';
import { reducer as words, operations as wordOperations } from './words';
import { reducer as test, operations as testOperations } from './test';

const rootReducer = combineReducers({
    view,
    voice,
    settings,
    words,
    test,
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
    ...testOperations,
};

export default store;