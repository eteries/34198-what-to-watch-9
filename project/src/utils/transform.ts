import { Month, FilmRating } from '../constants';
import { RatingLabel } from '../types/rating-label';

export const transformRating = (rating: number): RatingLabel | null => {
  if (rating > FilmRating.Bad.Min && rating < FilmRating.Bad.Max) {
    return FilmRating.Bad.Label;
  }
  if (rating >= FilmRating.Normal.Min && rating < FilmRating.Normal.Max) {
    return FilmRating.Normal.Label;
  }
  if (rating >= FilmRating.Good.Min && rating < FilmRating.Good.Max) {
    return FilmRating.Good.Label;
  }
  if (rating >= FilmRating.VeryGood.Min && rating < FilmRating.VeryGood.Max) {
    return FilmRating.VeryGood.Label;
  }
  if (rating === FilmRating.Awesome.Min) {
    return FilmRating.Awesome.Label;
  }

  return null;
};

export const formatDate = (isoDate: string): string => {
  const date = new Date(isoDate);
  return `${Month[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
};

export const formatRunTime = (minutes: number): string => (
  minutes >= 60
    ? `${Math.floor(minutes / 60)}h ${minutes % 60}m`
    : `${minutes}m`
);
