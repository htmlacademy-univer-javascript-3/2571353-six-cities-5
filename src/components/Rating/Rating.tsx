import React from 'react';
import {ObjectClass} from '../../utils/const.ts';

type IRatingProps = {
  rating: number;
  objectType: ObjectClass;
  isFullMode?: boolean;
};

export const Rating: React.FC<IRatingProps> = ({rating, objectType, isFullMode = false}) => (
  <div className={`${objectType}__rating rating`}>
    <div className={`${objectType}__stars rating__stars`}>
      <span style={{width: `${Math.floor(rating + 0.5) * 20}%`}}></span>
      <span className="visually-hidden">Rating</span>
    </div>
    {isFullMode && (
      <span className="offer__rating-value rating__value">{rating}</span>
    )}
  </div>
);
