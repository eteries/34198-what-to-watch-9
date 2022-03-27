import { Month, Rating } from '../constants';

export const transformRating = (rating: number): Rating | null => {
  if (rating > 0 && rating < 3) {
    return Rating.Bad;
  }
  if (rating >= 3 && rating < 5) {
    return Rating.Normal;
  }
  if (rating >= 5 && rating < 8) {
    return Rating.Good;
  }
  if (rating >= 8 && rating < 10) {
    return Rating.Very_Good;
  }
  if (rating === 10) {
    return Rating.Awesome;
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
