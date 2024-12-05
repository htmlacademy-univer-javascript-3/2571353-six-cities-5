import {TPlaceCard} from '../../utils/types.ts';
import React from 'react';
import {PlaceCard} from '../../components/PlaceCard/PlaceCard.tsx';
import {AppRoute, PlaceClassTypes} from '../../utils/const.ts';
import {Header} from '../../components/header/header.tsx';
import {Link} from 'react-router-dom';


interface IFavoritesProps {
  places: TPlaceCard[];
}

export const Favorites: React.FC<IFavoritesProps> = ({places}) => (
  <div className="page">
    <Header/>

    <main className="page__main page__main--favorites">
      <div className="page__favorites-container container">
        <section className="favorites">
          <h1 className="favorites__title">Saved listing</h1>
          <ul className="favorites__list">
            <li className="favorites__locations-items">
              <div className="favorites__locations locations locations--current">
                <div className="locations__item">
                  <a className="locations__item-link" href="#">
                    <span>Amsterdam</span>
                  </a>
                </div>
              </div>
              <div className="favorites__places">
                <PlaceCard place={places[0]} placeCardType={PlaceClassTypes.Favorites}/>
                <PlaceCard place={places[1]} placeCardType={PlaceClassTypes.Favorites}/>
              </div>
            </li>

            <li className="favorites__locations-items">
              <div className="favorites__locations locations locations--current">
                <div className="locations__item">
                  <a className="locations__item-link" href="#">
                    <span>Cologne</span>
                  </a>
                </div>
              </div>
              <div className="favorites__places">
                <PlaceCard place={places[2]} placeCardType={PlaceClassTypes.Favorites}/>
              </div>
            </li>
          </ul>
        </section>
      </div>
    </main>
    <footer className="footer container">
      <Link className="footer__logo-link" to={AppRoute.Main}>
        <img className="footer__logo" src="/img/logo.svg" alt="6 cities logo" width="64" height="33"/>
      </Link>
    </footer>
  </div>
);
