import React from 'react';
import {TReview} from '../../utils/types.ts';
import {dateToMonthWordYear, dateToYearMonthDay} from '../../utils/date.ts';
import {Rating} from '../Rating/Rating.tsx';
import {ObjectClass} from '../../utils/const.ts';

interface IReviewItemProps {
  review: TReview;
}

export const ReviewItem: React.FC<IReviewItemProps> = ({review}) => (
  <li className="reviews__item">
    <div className="reviews__user user">
      <div className="reviews__avatar-wrapper user__avatar-wrapper">
        <img className="reviews__avatar user__avatar" src={review.user.avatarUrl} width="54" height="54" alt="Reviews avatar"/>
      </div>
      <span className="reviews__user-name">{review.user.name}</span>
    </div>
    <div className="reviews__info">
      <Rating rating={review.rating} objectType={ObjectClass.Review}/>
      <p className="reviews__text">{review.comment}</p>
      <time className="reviews__time" dateTime={dateToYearMonthDay(new Date(review.date))}>
        {dateToMonthWordYear(new Date(review.date))}
      </time>
    </div>
  </li>
);
