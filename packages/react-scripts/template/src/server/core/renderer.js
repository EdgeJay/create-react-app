/**
 * Based on https://medium.com/@cereallarceny/server-side-rendering-with-create-react-app-fiber-react-router-v4-helmet-redux-and-thunk-275cb25ca972
 */

import fs from 'fs';
import path from 'path';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import createStore from '../../common/store';
import App from '../../client/App';

// if isRunningInPackage is true means that script is running in original create-react-app repo
const isRunningInPackage = __dirname.includes('/react-scripts');
const htmlTemplatePath = isRunningInPackage
  ? path.resolve(__dirname, '../../../../../../build/index.html')
  : path.resolve(__dirname, './build/index.html');

function getHtmlTemplate(path) {
  return new Promise((resolve, reject) => {
    fs.readFile(path, 'utf8', (err, template) => {
      if (err) {
        reject(err);
      } else {
        resolve(template);
      }
    });
  });
}

export function createHtmlContent({ htmlTemplate, mountContent }) {
  htmlTemplate = htmlTemplate.replace(
    '<div id="root"></div>',
    `<div id="root">${mountContent}</div>`
  );
  return htmlTemplate;
}

export default async ctx => {
  const htmlTemplate = await getHtmlTemplate(htmlTemplatePath);
  const path = ctx.request.href.split(ctx.request.host)[1];
  const { store, history } = createStore(path);
  const mountContent = renderToString(
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <App />
      </ConnectedRouter>
    </Provider>
  );
  return createHtmlContent({ htmlTemplate, mountContent });
};
