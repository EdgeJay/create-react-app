import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import './client/assets/css/index.css';
import App from './client/App';
import registerServiceWorker from './registerServiceWorker';
import createStore from './common/store';

async function initialize() {
  const { store, history } = await createStore();

  ReactDOM.hydrate(
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <App />
      </ConnectedRouter>
    </Provider>,
    document.getElementById('root')
  );

  registerServiceWorker();
}

initialize();
