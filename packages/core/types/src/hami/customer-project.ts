import type { AlwatrDocumentObjectActive } from './document-object-active';
import type { RequireFunc } from './require-functions';

export interface CustomerProjectModel extends CustomerProject {
  ordersCount?: number;
}

export interface CustomerProject extends AlwatrDocumentObjectActive {
  id: string;

  projectName: string;
  projectAddress: string;

  supervisorName: string;
  supervisorPhone: string;
}

export const customerProjectRequire: RequireFunc<CustomerProject> = (
  customerProject: Partial<CustomerProject>
): CustomerProject => ({
  id: 'auto_increment',
  projectAddress: 'no-project-address',
  projectName: 'no-project-name',
  supervisorName: 'no-supervisor-name',
  supervisorPhone: 'no-supervisor-phone',
  active: true,

  ...customerProject,
});
