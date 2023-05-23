import type { CustomerModel } from './customer.js';
import type { Notification } from './notification.js';
import type { OrderModel } from './order.js';
import type { ProductPrice } from './product-price.js';
import type { Product } from './product.js';
import type { Supplier } from './supplier.js';
import type { SignInResponse, UserModel } from './user.js';
import type { StringifyableRecord } from '../type-helper.js';
import type {
  AlwatrServiceResponse,
  AlwatrServiceResponseSuccess,
} from '@alwatr/type';
import type { AlwatrDocumentStorage } from '@alwatr/type/storage.js';

export interface Routes {
  'customer-storage': AlwatrDocumentStorage<CustomerModel>;
  'notification-storage': AlwatrDocumentStorage<Notification>;
  'order-storage': AlwatrDocumentStorage<OrderModel>;
  'product-price-storage': AlwatrDocumentStorage<ProductPrice>;
  'product-storage': AlwatrDocumentStorage<Product>;
  'sign-in': AlwatrServiceResponse<SignInResponse, StringifyableRecord>;
  'supplier-storage': AlwatrDocumentStorage<Supplier>;
  'user-storage': AlwatrDocumentStorage<UserModel>;
  user: AlwatrServiceResponseSuccess<SignInResponse>;
}
