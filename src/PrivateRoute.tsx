import React from 'react';
import {Navigate} from 'react-router-dom';
import {AppRoute} from './utils/const.ts';
import {useAppSelector} from './store/hooks.ts';

interface IPrivateRouteProps {
  children: JSX.Element;
}

export const PrivateRoute: React.FC<IPrivateRouteProps> = ({children}) => {
  const isAuthorized = useAppSelector((state) => state.authorizationStatus);
  return isAuthorized ? children : <Navigate to={AppRoute.Login}/>;
};
