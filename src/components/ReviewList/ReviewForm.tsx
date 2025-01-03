import React, {useState} from 'react';
import {ReviewRating} from '../Rating/ReviewRating.tsx';
import {TReviewFormState} from '../../utils/types.ts';

type ReviewFormProps = {
  onSubmit: (form:TReviewFormState) => void;
};

export const ReviewForm: React.FC<ReviewFormProps> = ({ onSubmit: submit }) => {

  const [form, setForm] = useState<TReviewFormState>({
    comment: '',
    rating: 0
  });

  const handleFormChange = (field: string, value: string | number) => {
    setForm({
      ...form,
      [field]: value
    });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    submit(form);

    setForm({comment: '', rating: 0});
  };

  return (
    <form className="reviews__form form" method="post" onSubmit={handleSubmit}>
      <label className="reviews__label form__label" htmlFor="review">Your review</label>

      <ReviewRating value={form.rating} onChange={handleFormChange} />

      <textarea
        className="reviews__textarea form__textarea"
        id="review"
        name="review"
        placeholder="Tell how was your stay, what you like and what can be improved"
        value={form.comment}
        onChange={(e) => handleFormChange('comment', e.target.value)}
      />
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set <span className="reviews__star">rating</span> and describe
          your stay with at least <b className="reviews__text-amount">50 characters</b>.
        </p>
        <button className="reviews__submit form__submit button" type="submit"
          disabled={form.comment.length < 50 || form.rating === 0}
        >
          Submit
        </button>
      </div>
    </form>
  );
};
