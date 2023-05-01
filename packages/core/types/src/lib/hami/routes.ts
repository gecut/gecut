import type {CustomerModel} from './customer.js';
import type {UserModel} from './user.js';
import type {AlwatrDocumentStorage} from '@alwatr/type/storage.js';

export interface Routes {
  '/customer-list/': Promise<AlwatrDocumentStorage<CustomerModel>>;
  '/user-list/': Promise<AlwatrDocumentStorage<UserModel>>;
}
