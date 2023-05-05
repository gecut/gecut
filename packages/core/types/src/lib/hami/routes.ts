import type {CustomerModel} from './customer.js';
import type {UserModel} from './user.js';
import type {Notification} from './notification.js';
import type {AlwatrDocumentStorage} from '@alwatr/type/storage.js';

export interface Routes {
  'customer-storage': Promise<AlwatrDocumentStorage<CustomerModel>>;
  'user-storage': Promise<AlwatrDocumentStorage<UserModel>>;
  'notification-storage': Promise<AlwatrDocumentStorage<Notification>>;
}
