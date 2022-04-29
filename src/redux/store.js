import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { createReduxHistoryContext } from 'redux-first-history';
import { createBrowserHistory } from 'history';

const preloadedState = {};

const { createReduxHistory, routerMiddleware, routerReducer } = createReduxHistoryContext({
  history: createBrowserHistory(),
});

export const store = configureStore({
  reducer: combineReducers({
    router: routerReducer,
  }),
  middleware: [routerMiddleware],
  devTools: process.env.NODE_ENV !== 'production',
  preloadedState,
});

export const history = createReduxHistory(store);
