import {useMemo, useState} from 'react';
import {OfferList} from '../../components/offer-list/offer-list.tsx';
import {Map} from '../../components/map/map.tsx';
import {Actions, LoadingStatus, PlaceClassTypes, SortName} from '../../utils/const.ts';
import {CityList} from '../../components/city-list/city-list.tsx';
import {useAppDispatch, useAppSelector} from '../../store/hooks.ts';
import {SortFilter} from '../../components/sort-filter/sort-filter.tsx';
import {Spinner} from '../../components/spinner/spinner.tsx';
import {Header} from '../../components/header/header.tsx';
import {setActiveOffer} from '../../store/action.ts';

export const Main = () => {
  const dispatch = useAppDispatch();
  const currentCity = useAppSelector((state) => state[Actions.City].city);
  const currentOffers = useAppSelector((state) => state[Actions.Offers].offers);
  const isLoading = useAppSelector((state) => state[Actions.Offers].isOffersDataLoading);
  const selectedPlaceId = useAppSelector((state) => state[Actions.Offer].activeOffer);

  const [currentFilter, setCurrentFilter] = useState<SortName>(SortName.Popular);

  const handleListItemHover = (placeItemId: string | undefined) => {
    if (selectedPlaceId !== placeItemId) {
      dispatch(setActiveOffer(placeItemId));
    }
  };

  const handleFilterChange = (filter: SortName) => {
    setCurrentFilter(filter);
  };

  const sortedOffers = useMemo(() => {
    const offers = currentOffers.filter((offer) => offer.city.name === currentCity.name);
    switch (currentFilter) {
      case SortName.TopRated:
        return offers.toSorted((a, b) => b.rating - a.rating);
      case SortName.HighToLow:
        return offers.toSorted((a, b) => b.price - a.price);
      case SortName.LowToHigh:
        return offers.toSorted((a, b) => a.price - b.price);
      default:
        return offers;
    }
  }, [currentOffers, currentFilter, currentCity]);

  return (
    <div className="page page--gray page--main">
      <Header/>

      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <section className="locations container">
            <CityList/>
          </section>
        </div>

        <div className="cities">

          {((isLoading === LoadingStatus.Failure || isLoading === LoadingStatus.Success) && sortedOffers.length === 0)
            ?
            <div className="cities__places-container cities__places-container--empty container">
              <section className="cities__no-places">
                <div className="cities__status-wrapper tabs__content">
                  <b className="cities__status">No places to stay available</b>
                  <p className="cities__status-description">We could not find any property available at the moment
                    in {currentCity.name}
                  </p>
                </div>
              </section>
              <div className="cities__right-section"></div>
            </div>
            :
            <div className="cities__places-container container">
              <section className="cities__places places">
                <h2 className="visually-hidden">Places</h2>
                <b className="places__found">{sortedOffers?.length} places to stay in {currentCity.name}</b>
                <SortFilter currentFilter={currentFilter} onFilterChange={handleFilterChange}/>
                {isLoading !== LoadingStatus.Success
                  ?
                  <Spinner/>
                  :
                  <OfferList
                    offers={sortedOffers}
                    onListItemHover={handleListItemHover}
                    listType={PlaceClassTypes.Cities}
                  />}
              </section>
              <div className="cities__right-section">
                <section className="cities__map map">
                  <Map city={currentCity} places={sortedOffers}/>
                </section>
              </div>
            </div>}
        </div>
      </main>
    </div>
  );
};
