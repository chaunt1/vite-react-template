import { autoBatchEnhancer, combineReducers, configureStore } from '@reduxjs/toolkit';
import { createReduxHistoryContext } from 'redux-first-history';
import { createBrowserHistory } from 'history';

const preloadedState = {};

const { createReduxHistory, routerMiddleware, routerReducer } = createReduxHistoryContext({
  history: createBrowserHistory(),
  routerReducerKey: 'router',
  reduxTravelling: true,
});

export const store = configureStore({
  reducer: combineReducers({
    router: routerReducer,
  }),
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(routerMiddleware),
  devTools: import.meta.env.DEV,
  preloadedState,
  enhancers: (existingEnhancers) => {
    // Add the autobatch enhancer to the store setup
    return existingEnhancers.concat(autoBatchEnhancer());
  },
});

export const history = createReduxHistory(store);
