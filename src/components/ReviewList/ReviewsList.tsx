import React from 'react';
import {TReview} from '../../utils/types.ts';
import {ReviewItem} from './ReviewItem.tsx';

interface IOfferListProps {
  reviews: TReview[];
}

export const ReviewsList: React.FC<IOfferListProps> = ({reviews}): JSX.Element => (
  <section className="offer__reviews reviews">
    <h2 className="reviews__title">
      Reviews &middot;<span className="reviews__amount">{reviews.length}</span>
    </h2>
    <ul className="reviews__list">
      {reviews.map((review) => (
        <ReviewItem key={review.id} review={review}/>
      ))}
    </ul>
  </section>
);
