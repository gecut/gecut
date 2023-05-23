import type { CustomerProject } from './customer-project.js';
import type { AlwatrDocumentObjectActive } from './document-object-active.js';
import type { Order } from './order.js';
import type { RequireFunc } from './require-functions.js';
import type { UserResponse } from './user.js';

export interface CustomerModel extends Customer {
  projectList: CustomerProject[];
  orderList: Order[];
  creator: UserResponse;
}

export interface Customer extends AlwatrDocumentObjectActive {
  firstName: string;
  lastName: string;
  phoneNumber: string;

  description: string;

  creatorId: string;
}

export const customerRequire: RequireFunc<Customer> = (
  customer: Partial<Customer>
): Customer => ({
  id: 'auto_increment',
  creatorId: 'no-creator-id',
  description: 'no-description',
  firstName: 'no-first-name',
  lastName: 'no-last-name',
  phoneNumber: 'no-phone-number',
  active: true,

  ...customer,
});
