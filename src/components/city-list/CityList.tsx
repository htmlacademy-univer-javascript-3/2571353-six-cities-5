import {CITIES} from '../../utils/const.ts';
import {useAppDispatch, useAppSelector} from '../../store/hooks.ts';
import {setCity, setOffers} from '../../store/action.ts';
import {offersMock} from '../../mocks/offersMock.ts';

export const CityList = () => {
  const currentCity = useAppSelector((state) => state.city);
  const dispatch = useAppDispatch();

  return (
    <ul className="locations__list tabs__list">
      {
        Object.entries(CITIES).map(([cityName, city]) => (
          <li key={cityName} className="locations__item">
            <a className={`locations__item-link tabs__item ${(cityName === currentCity.name) ? 'tabs__item--active' : null}`}
              href="#"
              onClick={() => {
                dispatch(setCity({city: city}));
                dispatch(setOffers({offers: offersMock.filter((offer) => offer.city.name === cityName)}));
              }}
            >
              <span>{cityName}</span>
            </a>
          </li>
        ))
      }
    </ul>
  );
};
