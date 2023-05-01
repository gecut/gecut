import type {AlwatrDocumentObjectActive} from './document-object-active.js';
import type {StringifyableRecord} from '../type-helper.js';

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
