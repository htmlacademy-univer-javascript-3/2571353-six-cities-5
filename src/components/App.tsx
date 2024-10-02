import React from 'react';
import { Main } from './MainPage/Main.tsx';
import { PlaceCardProps } from './pages/PlaceCard/PlaceCard.tsx';

type AppScreenProps = {
  places: PlaceCardProps[];
}

export const App: React.FC<AppScreenProps> = ({places}) => (
  <Main places={places}/>
);
