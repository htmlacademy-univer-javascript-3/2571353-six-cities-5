import React from 'react';
import { Main } from './pages/Main/Main.tsx';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import {Login} from './pages/Login/Login.tsx';
import {Favorites} from './pages/Favorites/Favorites.tsx';
import {Offer} from './pages/Offer/Offer.tsx';
import {NotFound} from './pages/NotFoundPage/NotFound.tsx';
import {AppRoute} from './utils/const.ts';
import {PrivateRoute} from './PrivateRoute.tsx';
import {TPlaceCard} from './utils/types.ts';
import {favorites} from './mocks/favorites.ts';

interface IAppProps {
  offers: TPlaceCard[];
}

export const App: React.FC<IAppProps> = ({offers}): JSX.Element => {
  const isAuthenticated = false;

  return (
    <BrowserRouter>
      <Routes>
        <Route path={AppRoute.Main} element={<Main places={offers} />} />
        <Route path={AppRoute.Login} element={<Login />} />
        <Route path={AppRoute.Favorites} element={
          <PrivateRoute isAuthenticated={isAuthenticated}>
            <Favorites places={favorites} />
          </PrivateRoute>
        }
        />
        <Route path={AppRoute.Offer} element={<Offer />} />
        <Route path={'*'} element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};
