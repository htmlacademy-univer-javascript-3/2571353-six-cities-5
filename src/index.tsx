import React from 'react';
import ReactDOM from 'react-dom/client';
import {Provider} from 'react-redux';
import {ToastContainer} from 'react-toastify';
import {store} from './store';
import {fetchFavorites, fetchOffers, userCheckAuth} from './store/api-actions.ts';
import {App} from './app.tsx';
import {BrowserRouter} from 'react-router-dom';

(function initApp() {
  store.dispatch(userCheckAuth());
  store.dispatch(fetchOffers());
  store.dispatch(fetchFavorites());
})();

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
      <ToastContainer />
    </Provider>
  </React.StrictMode>
);
