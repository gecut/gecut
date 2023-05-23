import type { AlwatrDocumentObjectActive } from './document-object-active.js';
import type { RequireFunc } from './require-functions.js';
import type { ArrayValues, StringifyableRecord } from '../type-helper.js';

export const orderStatusList = [
  'canceled',
  'evacuated',
  'accepted',
  'failed',
  'awaitingConfirmation',
] as const;

export interface Order extends AlwatrDocumentObjectActive {
  creatorId: string;
  customerId: string;
  customerProjectId: string;
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
  supplierId: string;
}

export const orderRequire: RequireFunc<Order> = (
  order: Partial<Order>
): Order => ({
  id: 'auto_increment',
  creatorId: 'no-creator-id',
  customerId: 'no-customer-id',
  customerProjectId: 'no-customer-project-id',
  evacuationDate: 0,
  registrationDate: 0,
  productList: [],
  status: 'awaitingConfirmation',
  active: true,

  ...order,
});
