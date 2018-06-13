/**
 * Based on https://medium.com/@cereallarceny/server-side-rendering-with-create-react-app-fiber-react-router-v4-helmet-redux-and-thunk-275cb25ca972
 */

import { createStore, applyMiddleware, compose } from 'redux';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import thunk from 'redux-thunk';
import { createBrowserHistory, createMemoryHistory } from 'history';
import { isClient, isInProductionMode, isInDevelopmentMode } from './utils/appUtil';
import reducers from './reducers';

export default (url = '/') => {
  const isInClient = isClient();

  // create history depending on environment
  const history = isInClient
    ? createBrowserHistory()
    : createMemoryHistory({
        initialEntries: [url],
      });

  const enhancers = [];

  let composeEnhancers = compose;
  if (isInDevelopmentMode() && isInClient) {
    composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  }

  const middlewares = [thunk, routerMiddleware(history)];

  // setup initial state
  let initialState = {};
  if (isInClient && window.__preload__) {
    initialState = window.__preload__;
  }

  // delete preload data once stored into variable
  if (isInProductionMode() && isInClient) {
    delete window.__preload__;
  }

  const store = createStore(
    connectRouter(history)(reducers),
    initialState,
    composeEnhancers(applyMiddleware(...middlewares), ...enhancers)
  );

  return {
    store,
    history,
  };
};
