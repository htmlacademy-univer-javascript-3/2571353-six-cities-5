import React from 'react';
import ReactDOM from 'react-dom/client';
import {App} from './App.tsx';
import {offers} from './mocks/offers.ts';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <App offers={offers}/>
  </React.StrictMode>
);
