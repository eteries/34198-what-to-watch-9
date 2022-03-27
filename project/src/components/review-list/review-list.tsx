import { Review } from '../../types/review';
import { splitArray } from '../../utils';
import { formatDate } from '../../utils/transform';

type ReviewListProps = {
  reviews: Review[];
}

function ReviewList({reviews}: ReviewListProps): JSX.Element {
  const [reviewsColOne, reviewsColTwo] = splitArray(reviews);

  const mapReviewToTemplate = ({id, comment, rating, date, user}: Review) => (
    <div className="review" key={id}>
      <blockquote className="review__quote">
        <p className="review__text">{comment}</p>

        <footer className="review__details">
          <cite className="review__author">{user.name}</cite>
          <time className="review__date" dateTime={date}>{formatDate(date)}</time>
        </footer>
      </blockquote>

      <div className="review__rating">{rating}</div>
    </div>
  );

  return (
    <div className="film-card__reviews film-card__row">
      <div className="film-card__reviews-col">
        {reviewsColOne.map(mapReviewToTemplate)}
      </div>
      <div className="film-card__reviews-col">
        {reviewsColTwo.map(mapReviewToTemplate)}
      </div>
    </div>
  );
}

export default ReviewList;
