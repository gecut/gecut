import type { CustomerProject } from './customer-project.js';
import type { Customer, CustomerModel } from './customer.js';
import type { Notification } from './notification.js';
import type { Order, OrderModel } from './order.js';
import type { ProductPrice } from './product-price.js';
import type { Product } from './product.js';
import type { Supplier, SupplierModel } from './supplier.js';
import type { SignInResponse, UserModel } from './user.js';
import type { StringifyableRecord } from '../type-helper.js';
import type {
  AlwatrServiceResponse,
  AlwatrServiceResponseSuccess,
} from '@alwatr/type';
import type { AlwatrDocumentStorage } from '@alwatr/type/storage.js';

export interface PatchRoutes {
  'patch-supplier-storage': {
    data: Array<Partial<Supplier>>;
  };
  'patch-notification-storage': {
    data: Array<Partial<Notification>>;
  };
  'patch-product-price-storage': {
    data: Array<Partial<ProductPrice>>;
  };
  'patch-customer-storage': {
    data: Array<Partial<Customer>>;
  };
  'patch-customer-project-storage': {
    data: Array<Partial<CustomerProject>>;
    customerId: string;
  };
  'put-order': Partial<Order>;
}

export interface Routes extends PatchRoutes {
  'customer-storage': AlwatrDocumentStorage<CustomerModel>;
  'notification-storage': AlwatrDocumentStorage<Notification>;
  'order-storage': AlwatrDocumentStorage<OrderModel>;
  'product-price-storage': AlwatrDocumentStorage<ProductPrice>;
  'product-storage': AlwatrDocumentStorage<Product>;
  'sign-in': AlwatrServiceResponse<SignInResponse, StringifyableRecord>;
  'supplier-storage': AlwatrDocumentStorage<SupplierModel>;
  'user-storage': AlwatrDocumentStorage<UserModel>;
  user: AlwatrServiceResponseSuccess<SignInResponse>;
}
