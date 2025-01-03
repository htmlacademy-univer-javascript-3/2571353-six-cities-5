import {userReducer} from './userReducer';
import {clearUserData, setAuthorizationStatus, setUserData} from '../action';
import {TUserFull} from '../../utils/types';

describe('userReducer', () => {
  const initialState = {
    authorizationStatus: false,
    userData: undefined,
  };

  const mockUserData: TUserFull = {
    name: 'John Doe',
    avatarUrl: '/img/avatar.jpg',
    isPro: true,
    email: 'johndoe@example.com',
    token: 'token123',
  };

  it('should return the initial state by default', () => {
    expect(userReducer(undefined, { type: undefined })).toEqual(initialState);
  });

  it('should handle setAuthorizationStatus action', () => {
    expect(userReducer(initialState, setAuthorizationStatus(true))).toEqual({
      ...initialState,
      authorizationStatus: true,
    });

    expect(userReducer(initialState, setAuthorizationStatus(false))).toEqual({
      ...initialState,
      authorizationStatus: false,
    });
  });

  it('should handle setUserData action', () => {
    expect(userReducer(initialState, setUserData(mockUserData))).toEqual({
      ...initialState,
      userData: mockUserData,
    });
  });

  it('should handle clearUserData action', () => {
    const stateWithUserData = {
      ...initialState,
      userData: mockUserData,
    };

    expect(userReducer(stateWithUserData, clearUserData())).toEqual({
      ...initialState,
      userData: undefined,
    });
  });
});
