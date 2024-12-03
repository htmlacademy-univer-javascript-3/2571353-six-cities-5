import React, {MouseEventHandler} from 'react';
import {TPlaceCard} from '../../utils/types.ts';
import {Link} from 'react-router-dom';

interface IPlaceCardProps {
  place: TPlaceCard;
  isFullSize: boolean;
  onMouseOver?: MouseEventHandler;
  onMouseLeave?: MouseEventHandler;
}

export const PlaceCard: React.FC<IPlaceCardProps> = ({
  place,
  isFullSize,
  onMouseOver,
  onMouseLeave
}) => (
  <article
    className={`${isFullSize ? 'cities__card' : 'favorites__card'} place-card`}
    onMouseOver={onMouseOver}
    onMouseLeave={onMouseLeave}
  >
    {place.isPremium && (
      <div className="place-card__mark">
        <span>Premium</span>
      </div>
    )}
    <div className={`${isFullSize ? 'cities__image-wrapper' : 'favorites__image-wrapper'} place-card__image-wrapper`}>
      <a href="#">
        <img
          className="place-card__image"
          src={place.imageSrc}
          width={isFullSize ? '260' : '150'}
          height={isFullSize ? '200' : '110'}
          alt={place.imageAlt}
        />
      </a>
    </div>
    <div className={`${isFullSize ? null : 'favorites__card-info'} place-card__info`}>
      <div className="place-card__price-wrapper">
        <div className="place-card__price">
          <b className="place-card__price-value">&euro;{place.price}</b>
          <span className="place-card__price-text">&#47;&nbsp;night</span>
        </div>
        <button className={`place-card__bookmark-button ${place.isBookmarked ? 'place-card__bookmark-button--active' : ''} button`} type="button">
          <svg className="place-card__bookmark-icon" width="18" height="19">
            <use xlinkHref="#icon-bookmark" />
          </svg>
          <span className="visually-hidden">To bookmarks</span>
        </button>
      </div>
      <div className="place-card__rating rating">
        <div className="place-card__stars rating__stars">
          <span style={{width: `${place.rating * 20}%` }}></span>
          <span className="visually-hidden">Rating</span>
        </div>
      </div>
      <h2 className="place-card__name">
        <Link to={`/offer/${place.id}`}>{place.name}</Link>
      </h2>
      <p className="place-card__type">{place.type}</p>
    </div>
  </article>
);
