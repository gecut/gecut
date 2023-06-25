import type { AlwatrDocumentObjectActive } from './document-object-active.js';
import type { OrderModel } from './order.js';
import type { RequireFunc } from './require-functions.js';
import type { StringifyableRecord } from '../type-helper.js';

export interface SupplierModel extends Supplier {
  orderList: OrderModel[];
}

export interface Supplier extends AlwatrDocumentObjectActive {
  uniqueCode: string;

  firstName?: string;
  lastName?: string;
  phoneNumber?: string;
  address?: string;
  description?: string;

  phoneNumberList: SupplierPhoneNumber[];
}

export interface SupplierPhoneNumber extends StringifyableRecord {
  name: string;
  phoneNumber: string;
}

export const supplierRequire: RequireFunc<Supplier> = (
  supplier: Partial<Supplier>
): Supplier => ({
  id: 'auto_increment',
  uniqueCode: 'no-unique-code',
  firstName: undefined,
  lastName: undefined,
  address: undefined,
  description: undefined,
  phoneNumber: undefined,
  phoneNumberList: [],
  active: true,

  ...supplier,
});
