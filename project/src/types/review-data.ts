import { Review } from './review';

export type ReviewData = Pick<Review, 'comment' | 'rating'> & {
  filmId: number;
}
