import React from 'react';
import { render, hydrate } from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import './client/assets/css/index.css';
import App from './client/App';
import registerServiceWorker from './registerServiceWorker';
import createStore from './common/store';

async function initialize() {
  const { store, history } = await createStore();
  const container = document.getElementById('root');
  const renderFunc = container.children.length > 0 ? hydrate : render;

  renderFunc(
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <App />
      </ConnectedRouter>
    </Provider>,
    container
  );

  registerServiceWorker();
}

initialize();
