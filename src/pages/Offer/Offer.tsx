import {useCallback, useEffect} from 'react';
import {Navigate, useParams} from 'react-router-dom';
import {ReviewsList} from '../../components/ReviewList/ReviewsList.tsx';
import {Map} from '../../components/map/map.tsx';
import {OfferList} from '../../components/OfferList/OfferList.tsx';
import {Actions, LoadingStatus, ObjectClass, PlaceClassTypes} from '../../utils/const.ts';
import {TReviewFormState} from '../../utils/types.ts';
import {useAppDispatch, useAppSelector} from '../../store/hooks.ts';
import {Header} from '../../components/header/header.tsx';
import {createComment, fetchComments, fetchOffer, fetchOffersNearby} from '../../store/api-actions.ts';
import {clearComments, clearNearbyOffers, clearOffer, setActiveOffer} from '../../store/action.ts';
import {Spinner} from '../../components/spinner/spinner.tsx';
import {Rating} from '../../components/Rating/Rating.tsx';
import {ReviewForm} from '../../components/ReviewList/ReviewForm.tsx';

export const Offer = () => {
  const {id} = useParams();
  const dispatch = useAppDispatch();

  const isAuthorized = useAppSelector((state) => state[Actions.User].authorizationStatus);
  const city = useAppSelector((state) => state[Actions.City].city);

  const offer = useAppSelector((state) => state[Actions.Offer].offer);
  const isOfferDataLoading = useAppSelector((state) => state[Actions.Offer].isOfferDataLoading);

  const nearbyOffers = useAppSelector((state) => state[Actions.Offers].nearbyOffers);
  const isOffersDataLoading = useAppSelector((state) => state[Actions.Offers].isOffersDataLoading);

  const reviews = useAppSelector((state) => state[Actions.Comment].comments);
  const isCommentsDataLoading = useAppSelector((state) => state[Actions.Comment].isCommentsDataLoading);

  useEffect(() => {
    if (!id) {
      return;
    }
    dispatch(fetchOffer(id));

    return () => {
      dispatch(clearOffer());
    };
  }, [dispatch, id]);

  useEffect(() => {
    if (!id || !offer) {
      return;
    }
    dispatch(fetchOffersNearby(id));
    dispatch(fetchComments(id));

    return () => {
      dispatch(clearNearbyOffers());
      dispatch(clearComments());
    };
  }, [dispatch, id, offer]);

  const handleListItemHover = (placeItemId: string | undefined) => {
    dispatch(setActiveOffer(placeItemId));
  };

  const submitComment = useCallback((form: TReviewFormState) => {
    if (!form || !offer) {
      return;
    }
    dispatch(createComment({offerId: offer.id, form}));
  }, [dispatch, offer]);

  if (!id || (isOfferDataLoading === LoadingStatus.Failure && !offer)) {
    return <Navigate to={'/404'}/>;
  }

  return (
    <div className="page">
      <Header/>

      <main className="page__main page__main--offer">
        {isOfferDataLoading !== LoadingStatus.Success || !offer ? (
          <Spinner/>
        ) : (
          <section className="offer">
            <div className="offer__gallery-container container">
              <div className="offer__gallery">
                {offer.images?.map((image) => (
                  <div className="offer__image-wrapper" key={image}>
                    <img className="offer__image" src={image} alt="Photo studio"/>
                  </div>
                ))}
              </div>
            </div>
            <div className="offer__container container">
              <div className="offer__wrapper">
                {offer.isPremium && (
                  <div className="offer__mark">
                    <span>Premium</span>
                  </div>
                )}

                <div className="offer__name-wrapper">
                  <h1 className="offer__name">
                    {offer.title}
                  </h1>
                  {isAuthorized && (
                    <button className="offer__bookmark-button button" type="button">
                      <svg className="offer__bookmark-icon" width="31" height="33">
                        <use xlinkHref="#icon-bookmark"/>
                      </svg>
                      <span className="visually-hidden">To bookmarks</span>
                    </button>
                  )}
                </div>
                <Rating
                  rating={offer.rating}
                  objectType={ObjectClass.Offer}
                  isFullMode
                />

                <ul className="offer__features">
                  <li className="offer__feature offer__feature--entire">
                    {offer.type}
                  </li>
                  <li className="offer__feature offer__feature--bedrooms">
                    {offer.bedrooms} Bedrooms
                  </li>
                  <li className="offer__feature offer__feature--adults">
                    Max {offer.maxAdults} adults
                  </li>
                </ul>
                <div className="offer__price">
                  <b className="offer__price-value">{offer.price}</b>
                  <span className="offer__price-text">&nbsp;night</span>
                </div>
                <div className="offer__inside">
                  <h2 className="offer__inside-title">What&apos;s inside</h2>
                  <ul className="offer__inside-list">
                    {offer.goods.map((good) => (
                      <li className="offer__inside-item" key={good}>
                        {good}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="offer__host">
                  <h2 className="offer__host-title">Meet the host</h2>
                  <div className="offer__host-user user">
                    <div className="offer__avatar-wrapper offer__avatar-wrapper--pro user__avatar-wrapper">
                      <img
                        className="offer__avatar user__avatar"
                        src={offer.host.avatarUrl}
                        width="74"
                        height="74"
                        alt="Host avatar"
                      />
                    </div>
                    <span className="offer__user-name">{offer.host.name}</span>
                    {offer.host.isPro && (
                      <span className="offer__user-status">Pro</span>
                    )}
                  </div>
                  <div className="offer__description">
                    <p className="offer__text">{offer.description}</p>
                  </div>
                </div>
                {isCommentsDataLoading !== LoadingStatus.Success || !reviews ? (
                  <Spinner/>
                ) : (
                  <ReviewsList reviews={reviews}/>
                )}
                {isAuthorized && <ReviewForm onSubmit={submitComment}/>}
              </div>
            </div>
            <section className="offer__map map">
              <Map city={city} places={nearbyOffers}/>
            </section>
          </section>
        )}
        <div className="container">
          {isOffersDataLoading !== LoadingStatus.Success || !nearbyOffers ? (
            <Spinner/>
          ) : (
            <section className="near-places places">
              <h2 className="near-places__title">Other places in the neighbourhood</h2>
              <div className="near-places__list places__list">
                <OfferList
                  offers={nearbyOffers}
                  onListItemHover={handleListItemHover}
                  listType={PlaceClassTypes.NearPlaces}
                />
              </div>
            </section>
          )}
        </div>
      </main>
    </div>
  );
};
