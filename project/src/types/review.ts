import { User } from '../mocks/user';

export type Review = {
  id: number,
  user: User,
  rating: number,
  comment: string,
  date: string
}
