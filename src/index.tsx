import React from 'react';
import ReactDOM from 'react-dom/client';
import {Provider} from 'react-redux';
import {ToastContainer} from 'react-toastify';
import {store} from './store';
import {fetchOffers, userCheckAuth} from './store/api-actions.ts';
import {App} from './App.tsx';

(function initApp() {
  store.dispatch(fetchOffers());
  store.dispatch(userCheckAuth());
})();

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
      <ToastContainer />
    </Provider>
  </React.StrictMode>
);
