import type { AlwatrDocumentObjectActive } from './document-object-active.js';
import type { Order } from './order.js';
import type { User } from './user.js';
import type { StringifyableRecord } from '../type-helper.js';

export interface CustomerModel extends Customer {
  orderList: Order[];
  creator: User;
}

export interface Customer extends AlwatrDocumentObjectActive {
  firstName: string;
  lastName: string;
  phoneNumber: string;

  description: string;

  projectList: CustomerProject[];

  creatorId: string;
}

export interface CustomerProject extends StringifyableRecord {
  id: string;

  projectName: string;
  projectAddress: string;

  supervisorName: string;
  supervisorPhone: string;

  guardName: string;
  guardPhone: string;
}
