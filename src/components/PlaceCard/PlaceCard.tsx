import React, {MouseEventHandler} from 'react';
import {TPlaceCard} from '../../utils/types.ts';
import {Link} from 'react-router-dom';
import {Rating} from '../Rating/Rating.tsx';
import {Actions, ObjectClass, PlaceClassTypes} from '../../utils/const.ts';
import {useAppDispatch, useAppSelector} from '../../store/hooks.ts';
import {changeFavorite} from '../../store/api-actions.ts';

interface IPlaceCardProps {
  place: TPlaceCard;
  placeCardType: PlaceClassTypes;
  onMouseOver?: MouseEventHandler;
  onMouseLeave?: MouseEventHandler;
}

export const PlaceCard: React.FC<IPlaceCardProps> = ({
  place,
  placeCardType,
  onMouseOver,
  onMouseLeave
}) => {
  const dispatch = useAppDispatch();
  const isAuthorized = useAppSelector((state) => state[Actions.User].authorizationStatus);

  const onFavoriteClick = () => {
    dispatch(
      changeFavorite({
        offerId: place.id,
        favoriteStatus: !place.isFavorite,
      }),
    );
  };

  return (
    <article
      className={`${placeCardType}__card place-card`}
      onMouseOver={onMouseOver}
      onMouseLeave={onMouseLeave}
    >
      {place.isPremium && (
        <div className="place-card__mark">
          <span>Premium</span>
        </div>
      )}
      <div className={`${placeCardType}__image-wrapper place-card__image-wrapper`}>
        <Link to={`/offer/${place.id}`}>
          <img
            className="place-card__image"
            src={place.previewImage}
            width={placeCardType !== PlaceClassTypes.Favorites ? '260' : '150'}
            height={placeCardType !== PlaceClassTypes.Favorites ? '200' : '110'}
            alt="Alt"
          />
        </Link>
      </div>
      <div className={`${placeCardType === PlaceClassTypes.Favorites ? 'favorites__card-info' : null} place-card__info`}>
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{place.price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          {isAuthorized && (
            <button
              className={`place-card__bookmark-button ${place.isFavorite ? 'place-card__bookmark-button--active' : ''} button`}
              type="button"
              onClick={onFavoriteClick}
            >
              <svg className="place-card__bookmark-icon" width="18" height="19">
                <use xlinkHref="#icon-bookmark"/>
              </svg>
              <span className="visually-hidden">To bookmarks</span>
            </button>
          )}
        </div>
        <Rating rating={place.rating} objectType={ObjectClass.Place}/>
        <h2 className="place-card__name">
          <Link to={`/offer/${place.id}`}>{place.title}</Link>
        </h2>
        <p className="place-card__type">{place.type}</p>
      </div>
    </article>
  );
};
