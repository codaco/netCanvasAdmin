import React, { Fragment } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import {
  Route,
  Switch,
} from 'react-router-dom';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './ducks/store';
import App from './components/App';
import ClipPaths from './components/ClipPaths';
import initPreventFileDrop from './utils/initPreventFileDrop';
import initIPCListeners from './utils/initIPCListeners';
import initFileOpener from './utils/initFileOpener';

import './styles/main.scss';

initIPCListeners();
initPreventFileDrop();

const startApp = () => {
  ReactDOM.render(
    <>
      <ClipPaths />
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Switch>
            <Route path="/" component={App} />
          </Switch>
        </PersistGate>
      </Provider>
    </>,
    document.getElementById('root'),
  );
};

window.addEventListener('load', () => {
  startApp();
  initFileOpener();
});
