import React from 'react';
import {TPlaceCard} from '../../utils/types.ts';
import {PlaceCard} from '../PlaceCard/PlaceCard.tsx';

interface IOfferListProps {
  offers: TPlaceCard[];
  onListItemHover: (listItemName: number | null) => void;
}

export const OfferList: React.FC<IOfferListProps> = ({offers, onListItemHover}): JSX.Element => (
  <div className="cities__places-list places__list tabs__content">
    {offers.map((place) => (
      <PlaceCard
        key={place.id}
        place={place}
        isFullSize
        onMouseOver={() => onListItemHover(place.id)}
        onMouseLeave={() => onListItemHover(null)}
      />))}
  </div>
);
