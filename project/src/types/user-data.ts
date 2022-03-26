import { User } from './user';

export type UserData = User & {
  token: string
}
