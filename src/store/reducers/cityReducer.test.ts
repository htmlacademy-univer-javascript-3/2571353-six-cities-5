import {cityReducer} from './cityReducer';
import {changeCity} from '../action';
import {TCity} from '../../utils/types';
import {CITIES} from '../../utils/const.ts';

describe('cityReducer', () => {
  const initialState = {
    city: CITIES.Paris
  };

  it('should return the initial state by default', () => {
    expect(cityReducer(undefined, {type: undefined})).toEqual(initialState);
  });

  it('should handle changeCity action', () => {
    const newCity: TCity = {name: 'Amsterdam', location: {latitude: 52.3676, longitude: 4.9041, zoom: 12}};
    expect(cityReducer(initialState, changeCity(newCity))).toEqual({city: newCity});
  });
});
