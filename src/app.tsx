import {Route, Routes} from 'react-router-dom';
import {Main} from './pages/main/main.tsx';
import {Login} from './pages/login/login.tsx';
import {Favorites} from './pages/favorites/favorites.tsx';
import {Offer} from './pages/offer/offer.tsx';
import {NotFound} from './pages/not-found-page/not-found-page.tsx';
import {AppRoute} from './utils/const.ts';
import {PrivateRoute} from './private-route.tsx';

export const App = () => (
  <Routes>
    <Route path={AppRoute.Main} element={<Main/>}/>
    <Route path={AppRoute.Login} element={<Login/>}/>
    <Route path={AppRoute.Favorites} element={
      <PrivateRoute>
        <Favorites/>
      </PrivateRoute>
    }
    />
    <Route path={AppRoute.Offer} element={<Offer/>}/>
    <Route path={'*'} element={<NotFound/>}/>
  </Routes>
);
