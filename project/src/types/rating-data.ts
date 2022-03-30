import { RatingLabel } from './rating-label';

export type RatingData = {
  [key: string]: {
    Label: RatingLabel;
    Min: number,
    Max: number
  }
}
