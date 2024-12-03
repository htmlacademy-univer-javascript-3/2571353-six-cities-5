import React, {useEffect, useState} from 'react';
import {TPlaceCard} from '../../utils/types.ts';
import {PlaceCard} from '../PlaceCard/PlaceCard.tsx';


interface IOfferListProps {
  offers: TPlaceCard[];
}

export const OfferList: React.FC<IOfferListProps> = ({offers}): JSX.Element => {

  const [activeCard, setActiveCard] = useState<null | number>(null);

  useEffect(() => {
    // eslint-disable-next-line no-console
    console.log(activeCard);
  }, [activeCard]);

  return (
    <div className="cities__places-list places__list tabs__content">
      {offers.map((place) => (
        <PlaceCard
          key={place.id}
          place={place}
          isFullSize
          onMouseOver={() => setActiveCard(place.id)}
          onMouseLeave={() => setActiveCard(null)}
        />))}
    </div>
  );
};
