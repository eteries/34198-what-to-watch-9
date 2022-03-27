import { Film } from '../../types/film';
import { transformRating } from '../../utils/transform';

type FIlmOverviewProps = {
  film: Film;
  reviewsNum: number;
}

function FilmOverview({film, reviewsNum}: FIlmOverviewProps): JSX.Element {
  return (
    <>
      <div className="film-rating">
        <div className="film-rating__score">{film.rating}</div>
        <p className="film-rating__meta">
          <span className="film-rating__level">{transformRating(film.rating)}</span>
          <span className="film-rating__count">{reviewsNum} ratings</span>
        </p>
      </div>

      <div className="film-card__text">
        <p>{film.description}</p>

        <p className="film-card__director"><strong>Director: {film.director}</strong></p>

        <p className="film-card__starring">
          <strong>Starring: {film.starring.join(', ')} and other</strong>
        </p>
      </div>
    </>
  );
}

export default FilmOverview;
