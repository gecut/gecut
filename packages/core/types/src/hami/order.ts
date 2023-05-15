import type { AlwatrDocumentObjectActive } from './document-object-active.js';
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
