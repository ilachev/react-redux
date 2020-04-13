import { applyMiddleware, compose, createStore } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { createLogger } from 'redux-logger';

import rootReducer from '../reducers';
import { paginationMiddleware } from "../middlewares";

const loggerMiddleware = createLogger();

export default function configureStore(preloadedState = {}) {
    const middlewares = [thunkMiddleware, paginationMiddleware, loggerMiddleware]; // loggerMiddleware
    const middlewareEnhancer = composeWithDevTools(
        applyMiddleware(...middlewares)
    );

    const enhancers = [middlewareEnhancer];
    const composedEnhancers = compose(...enhancers);

    return createStore(rootReducer, preloadedState, composedEnhancers);
}