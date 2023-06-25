import type { CustomerProject } from './customer-project.js';
import type { Customer } from './customer.js';
import type { AlwatrDocumentObjectActive } from './document-object-active.js';
import type { Product } from './product.js';
import type { RequireFunc } from './require-functions.js';
import type { Supplier } from './supplier.js';
import type { User } from './user.js';
import type { ArrayValues, StringifyableRecord } from '../type-helper.js';

export interface OrderModel extends Order {
  creator?: User;
  customer?: Customer;
  customerProject?: CustomerProject;
  supplier?: Supplier;
  productList: OrderProductModel[];
}

export interface OrderProductModel extends OrderProduct {
  product: Product;
}

export const orderStatusList = [
  'canceled',
  'evacuated',
  'accepted',
  'failed',
  'awaitingConfirmation',
] as const;

export interface Order extends AlwatrDocumentObjectActive {
  creatorId?: string;
  supplierId?: string;
  customerId?: string;
  customerProjectId?: string;
  description?: string;
  registrationDate: number;
  evacuationDate: number;
  status: ArrayValues<typeof orderStatusList>;
  productList: OrderProduct[];
}

export interface OrderProduct extends StringifyableRecord {
  productId: string;
  salesPrice: number;
  purchasePrice: number;
  quantity: number;
  unit: string;
  discount: number;
}

export const orderRequire: RequireFunc<Order> = (
  order: Partial<Order>
): Order => ({
  id: 'auto_increment',
  creatorId: undefined,
  customerId: undefined,
  supplierId: undefined,
  customerProjectId: undefined,
  description: undefined,
  evacuationDate: 0,
  registrationDate: 0,
  productList: [],
  status: 'awaitingConfirmation',
  active: true,

  ...order,
});
