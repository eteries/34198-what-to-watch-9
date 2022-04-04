import { ChangeEvent, Fragment, useState, FormEvent, useEffect } from 'react';

import { Setting } from '../../constants';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { postReviewAction } from '../../store/async-actions';
import { State } from '../../types/state';

type ReviewFormProps = {
  filmId: number;
}

function ReviewForm({filmId}: ReviewFormProps): JSX.Element {
  const [rating, setRating] = useState(Setting.DefaultRating);
  const [review, setReview] = useState('');
  const [isValid, setIsValid] = useState(false);
  const [isTouched, setIsTouched] = useState(false);

  const {isLoading} = useAppSelector((state: State) => state);

  const dispatch = useAppDispatch();

  useEffect(() => {
    const length = review.trim().length;

    if (length < 50 || length > 400) {
      setIsValid(false);
      return;
    }
    setIsValid(true);
  }, [review, isTouched]);

  const handleTextInput = ({target: {value}}: ChangeEvent<HTMLTextAreaElement>) => {
    setReview(value);
    setIsTouched(true);
  };

  const handleReviewSubmit = (evt: FormEvent) => {
    evt.preventDefault();
    if (!isValid) {
      return;
    }

    dispatch(postReviewAction({
      comment: review,
      filmId,
      rating,
    }));
  };

  return (
    <form action="#" className="add-review__form" onSubmit={handleReviewSubmit}>
      <div className="rating">
        <div className="rating__stars">
          {
            new Array(Setting.StarsNum)
              .fill(null)
              .map((item, index) => (index + 1))
              .reverse()
              .map((value) => (
                <Fragment key={value}>
                  <input className="rating__input"
                    id={`star-${value}`}
                    type="radio"
                    name="rating"
                    value={value}
                    onChange={() => setRating(value)}
                    checked={rating === value}
                  />
                  <label className="rating__label"
                    htmlFor={`star-${value}`}
                  >
                    Rating {`star-${value}`}
                  </label>
                </Fragment>
              ))
          }
        </div>
      </div>

      <div className="add-review__text">
        <textarea className="add-review__textarea"
          name="review-text"
          id="review-text"
          placeholder="Review text"
          value={review}
          onChange={handleTextInput}
        />
        <div className="add-review__submit">
          <button
            className="add-review__btn"
            type="submit"
            disabled={!isValid || isLoading}
          >
            Post
          </button>
        </div>

      </div>

      {!isValid && isTouched &&
        <p style={{color: '#866866'}}>
          A review must be from 50 to 400 characters long
        </p>}
    </form>
  );
}

export default ReviewForm;
