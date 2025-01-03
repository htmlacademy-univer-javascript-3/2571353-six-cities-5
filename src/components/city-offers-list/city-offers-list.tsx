import {useMemo} from 'react';
import {Actions, PlaceClassTypes} from '../../utils/const.ts';
import {useAppSelector} from '../../store/hooks.ts';
import {PlaceCard} from '../place-card/place-card.tsx';
import {TCityName, TPlaceCard} from '../../utils/types.ts';

export const CityOffersList = () => {
  const favorites = useAppSelector((state) => state[Actions.Favorites].favorites);

  const cityToOffersMap = useMemo(() => {
    const cityOffersMap: Partial<Record<TCityName, TPlaceCard[]>> = {};
    favorites.forEach((offer) => {
      const city = offer.city.name;
      if (!cityOffersMap[city]) {
        cityOffersMap[city] = [];
      }
      cityOffersMap[city]?.push(offer);
    });
    return cityOffersMap;
  }, [favorites]);

  return (
    <ul className="favorites__list">
      {
        Object.entries(cityToOffersMap).map(([cityName, cityOffers]) => (
          <li className="favorites__locations-items" key={cityName}>
            <div className="favorites__locations locations locations--current">
              <div className="locations__item">
                <a className="locations__item-link" href="#">
                  <span>{cityName}</span>
                </a>
              </div>
            </div>
            <div className="favorites__places">
              {cityOffers.map((offer) => (
                <PlaceCard place={offer} key={offer.id} placeCardType={PlaceClassTypes.Favorites}/>
              ))}
            </div>
          </li>
        ))
      }
    </ul>
  );
};
