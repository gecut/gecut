import type { AlwatrDocumentObjectActive } from './document-object-active';

export interface CustomerProject extends AlwatrDocumentObjectActive {
  id: string;

  projectName: string;
  projectAddress: string;

  supervisorName: string;
  supervisorPhone: string;

  guardName: string;
  guardPhone: string;
}
