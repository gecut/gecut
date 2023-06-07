import type { AlwatrDocumentObjectActive } from './document-object-active.js';
import type { RequireFunc } from './require-functions.js';
import type { StringifyableRecord } from '../type-helper.js';

export interface Supplier extends AlwatrDocumentObjectActive {
  uniqueCode: string;

  firstName: string;
  lastName: string;
  phoneNumber: string;
  address: string;
  description: string;

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
  firstName: 'no-first-name',
  lastName: 'no-last-name',
  address: 'no-address',
  description: 'no-description',
  phoneNumber: 'no-phone-number',
  phoneNumberList: [],
  active: true,

  ...supplier,
});
