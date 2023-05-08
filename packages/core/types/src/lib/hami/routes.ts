import type { StringifyableRecord } from '../type-helper.js';
import type {
  AlwatrServiceResponse,
  AlwatrServiceResponseSuccess,
} from '@alwatr/type';
import type { CustomerModel } from './customer.js';
import type { SignInResponse, UserModel } from './user.js';
import type { Notification } from './notification.js';
import type { AlwatrDocumentStorage } from '@alwatr/type/storage.js';

export interface Routes {
  'customer-storage': AlwatrDocumentStorage<CustomerModel>;
  'user-storage': AlwatrDocumentStorage<UserModel>;
  'notification-storage': AlwatrDocumentStorage<Notification>;
  user: AlwatrServiceResponseSuccess<SignInResponse>;
  'sign-in': AlwatrServiceResponse<SignInResponse, StringifyableRecord>;
}
