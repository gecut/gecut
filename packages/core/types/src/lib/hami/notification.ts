import type {AlwatrDocumentObjectActive} from './document-object-active.js';
import type {ArrayValues} from '../type-helper.js';

export const notificationStatusList = ['danger', 'warning', 'normal', 'success'] as const;

export interface Notification extends AlwatrDocumentObjectActive {
  message: string;
  status: ArrayValues<typeof notificationStatusList>;
}
