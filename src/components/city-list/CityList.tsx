import {Actions, CITIES} from '../../utils/const.ts';
import {useAppDispatch, useAppSelector} from '../../store/hooks.ts';
import {changeCity} from '../../store/action.ts';

export const CityList = () => {
  const currentCity = useAppSelector((state) => state[Actions.City].city);
  const dispatch = useAppDispatch();

  return (
    <ul className="locations__list tabs__list">
      {
        Object.entries(CITIES).map(([cityName, city]) => (
          <li key={cityName} className="locations__item">
            <a className={`locations__item-link tabs__item ${(cityName === currentCity.name) ? 'tabs__item--active' : null}`}
              onClick={() => dispatch(changeCity(city))}
            >
              <span>{cityName}</span>
            </a>
          </li>
        ))
      }
    </ul>
  );
};
