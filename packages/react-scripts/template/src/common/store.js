/**
 * Based on https://medium.com/@cereallarceny/server-side-rendering-with-create-react-app-fiber-react-router-v4-helmet-redux-and-thunk-275cb25ca972
 */

import fs from 'fs';
import path from 'path';
import { createStore, applyMiddleware, compose } from 'redux';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import thunk from 'redux-thunk';
import { createBrowserHistory, createMemoryHistory } from 'history';
import {
  isClient,
  isInProductionMode,
  isInDevelopmentMode,
  getBuildFolderPath,
} from './utils/appUtil';
import reducers from './reducers';

let assetManifest = null;

function getAssetManifest() {
  if (assetManifest) {
    return Promise.resolve(assetManifest);
  }

  return new Promise((resolve, reject) => {
    const assetManifestPath = path.resolve(getBuildFolderPath(), 'asset-manifest.json');
    fs.readFile(assetManifestPath, 'utf8', (err, data) => {
      if (err) {
        reject(err);
      } else {
        try {
          let manifest = JSON.parse(data);
          manifest = Object.keys(manifest).reduce(
            (acc, val) => ({
              ...acc,
              [`/${val}`]: `/${manifest[val]}`,
            }),
            {}
          );
          resolve(manifest);
        } catch (parseError) {
          reject(parseError);
        }
      }
    });
  });
}

async function getServerInitialState() {
  const assetManifest = await getAssetManifest();
  return {
    app: {
      assetManifest,
    },
  };
}

export default async (url = '/') => {
  const isInClient = isClient();

  // create history depending on environment
  const history = isInClient
    ? createBrowserHistory()
    : createMemoryHistory({
        initialEntries: [url],
      });

  const enhancers = [];

  // use redux devtools compose extension is available
  let composeEnhancers = compose;
  if (isInDevelopmentMode() && isInClient) {
    composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  }

  // setup middlewares
  const middlewares = [thunk, routerMiddleware(history)];

  // setup initial state
  let initialState = {};

  if (!isInClient) {
    // script is accessed in backend,
    // prepare initialState to add to window.__preload__
    // to be picked up by frontend script
    initialState = await getServerInitialState();
  } else if (window.__preload__) {
    // script is accessed in frontend,
    // check if preloaded state from server is available
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
