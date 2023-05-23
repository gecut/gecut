import type { AlwatrDocumentObjectActive } from './document-object-active.js';
import type { RequireFunc } from './require-functions.js';
import type { ArrayValues } from '../type-helper.js';

export const notificationStatusList = [
  'danger',
  'warning',
  'normal',
  'success',
] as const;

export interface Notification extends AlwatrDocumentObjectActive {
  message: string;
  status: ArrayValues<typeof notificationStatusList>;
}

export const notificationRequire: RequireFunc<Notification> = (
  notification: Partial<Notification>
): Notification => ({
  id: 'auto_increment',
  message: 'no-message',
  status: 'normal',
  active: true,

  ...notification,
});
