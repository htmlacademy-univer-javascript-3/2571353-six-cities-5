import React from 'react';
import {TPlaceCard} from '../../utils/types.ts';
import {PlaceCard} from '../place-card/place-card.tsx';
import {PlaceClassTypes} from '../../utils/const.ts';

interface IOfferListProps {
  offers: TPlaceCard[];
  onListItemHover: (listItemName: string | undefined) => void;
  listType: PlaceClassTypes;
}

export const OfferList: React.FC<IOfferListProps> = ({offers, onListItemHover, listType }): JSX.Element => (
  <div className={
    `${listType === PlaceClassTypes.Cities ? 'cities__places-list' : 'near-places__list'} places__list
    ${listType === PlaceClassTypes.Cities ? 'tabs__content' : null}`
  }
  data-testid="offer-list-container"
  >
    {offers.map((place) => (
      <PlaceCard
        key={place.id}
        place={place}
        placeCardType={listType}
        onMouseOver={() => onListItemHover(place.id)}
        onMouseLeave={() => onListItemHover(undefined)}
      />))}
  </div>
);
