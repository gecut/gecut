import type {Customer} from './customer.js';
import type {Order} from './order.js';
import type {AlwatrDocumentObjectActive} from './document-object-active.js';
import type {ArrayValues} from '../type-helper.js';

export const userGenderList = ['male', 'female'] as const;
export const userRoleList = ['admin', 'seller'] as const;

export interface UserModel extends User {
  orderList: Order[];
  customerList: Customer[];
}

export interface User extends AlwatrDocumentObjectActive {
  firstName: string;
  lastName: string;

  phoneNumber: string;
  password: string;

  score: number;

  role: ArrayValues<typeof userRoleList>;

  gender?: ArrayValues<typeof userGenderList>;
  email?: string;
}

export type SignInRequest = Pick<User, 'phoneNumber' | 'password'>;
export type SignInResponse = User & {token: string};

/**
 * This is a TypeScript function that takes in a partial user object and returns a complete user object
 * with default values for any missing properties.
 * @param user - The parameter `user` is an object of type `Partial<User>`, which means it can contain
 * some or all of the properties of the `User` type. The function `userRequire` returns an object of
 * type `User` with default values for all properties, and any properties passed in the
 */
export const userRequire = (user: Partial<User>): User => ({
  id: 'auto_increment',
  firstName: '',
  lastName: '',
  phoneNumber: '',
  password: '',
  score: 0,
  role: 'seller',
  active: true,

  gender: undefined,
  email: undefined,

  ...user,
});
