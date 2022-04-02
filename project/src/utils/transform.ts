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

export const formatTimeLeft = (secondsTotal: number | null): string | null => {
  if (secondsTotal === 0 || secondsTotal === null) {
    return null;
  }

  let result = '-';
  let remaining = secondsTotal;
  const hours = Math.floor(secondsTotal / (60*60));

  if (hours >= 1) {
    result += (hours < 10 ? `0${hours}:` : `${hours}:`);
    remaining -= hours * 60*60;
  }

  const minutes = Math.floor(remaining / 60);
  result += (minutes < 10 ? `0${minutes}:` : `${minutes}:`);
  remaining -= minutes * 60;

  const seconds = Math.floor(remaining);
  result += (seconds < 10 ? `0${seconds}:` : `${seconds}`);

  return result;
};
