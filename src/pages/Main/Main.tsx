import {useState} from 'react';
import {TPlaceCard} from '../../utils/types.ts';
import {OfferList} from '../../components/OfferList/OfferList.tsx';
import {Map} from '../../components/map/map.tsx';
import {PlaceClassTypes} from '../../utils/const.ts';
import {CityList} from '../../components/city-list/CityList.tsx';
import {useAppSelector} from '../../store/hooks.ts';

export const Main = () => {

  const [selectedPlace, setSelectedPlace] = useState<TPlaceCard | undefined>(undefined);

  const currentCity = useAppSelector((state) => state.city);
  const currentOffers = useAppSelector((state) => state.offers);

  const handleListItemHover = (placeItemId: number | null) => {
    const currentPlace = currentOffers.find((place) => place.id === placeItemId);
    setSelectedPlace(currentPlace);
  };

  return (
    <div className="page page--gray page--main">
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <a className="header__logo-link header__logo-link--active">
                <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41"/>
              </a>
            </div>
            <nav className="header__nav">
              <ul className="header__nav-list">
                <li className="header__nav-item user">
                  <a className="header__nav-link header__nav-link--profile" href="#">
                    <div className="header__avatar-wrapper user__avatar-wrapper">
                    </div>
                    <span className="header__user-name user__name">Oliver.conner@gmail.com</span>
                    <span className="header__favorite-count">3</span>
                  </a>
                </li>
                <li className="header__nav-item">
                  <a className="header__nav-link" href="#">
                    <span className="header__signout">Sign out</span>
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </header>

      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <section className="locations container">
            <CityList />
          </section>
        </div>
        <div className="cities">
          <div className="cities__places-container container">
            <section className="cities__places places">
              <h2 className="visually-hidden">Places</h2>
              <b className="places__found">{currentOffers?.length} places to stay in {currentCity.name}</b>
              <form className="places__sorting" action="#" method="get">
                <span className="places__sorting-caption">Sort by</span>
                <span className="places__sorting-type" tabIndex={0}>
                  Popular
                  <svg className="places__sorting-arrow" width="7" height="4">
                    <use xlinkHref="#icon-arrow-select"/>
                  </svg>
                </span>
                <ul className="places__options places__options--custom places__options--opened">
                  <li className="places__option places__option--active" tabIndex={0}>Popular</li>
                  <li className="places__option" tabIndex={0}>Price: low to high</li>
                  <li className="places__option" tabIndex={0}>Price: high to low</li>
                  <li className="places__option" tabIndex={0}>Top rated first</li>
                </ul>
              </form>
              <OfferList offers={currentOffers} onListItemHover={handleListItemHover} listType={PlaceClassTypes.Cities}/>
            </section>
            <div className="cities__right-section">
              <section className="cities__map map">
                <Map city={currentCity} places={currentOffers} selectedPlace={selectedPlace}/>
              </section>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
