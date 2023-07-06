import type { AlwatrDocumentObjectActive } from './document-object-active';
import type { RequireFunc } from './require-functions';

export interface CustomerProjectModel extends CustomerProject {
  ordersCount?: number;
}

export interface CustomerProject extends AlwatrDocumentObjectActive {
  projectName?: string;
  projectAddress?: string;

  supervisorName?: string;
  supervisorPhone?: string;
}

export const customerProjectRequire: RequireFunc<CustomerProject> = (
    customerProject: Partial<CustomerProject>
): CustomerProject => ({
  id: 'auto_increment',
  projectAddress: undefined,
  projectName: undefined,
  supervisorName: undefined,
  supervisorPhone: undefined,
  active: true,

  ...customerProject,
});
