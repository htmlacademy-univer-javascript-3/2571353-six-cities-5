import {Link} from 'react-router-dom';
import {AppRoute} from '../../utils/const.ts';
import {Header} from '../../components/header/header.tsx';

export const NotFound = () => (
  <div className="page page--gray page--main">
    <Header />

    <main className="page__main page__main--index">
      <h1>404 Page not found</h1>
      <Link to={AppRoute.Main}>Back to main page</Link>
    </main>
  </div>
);
