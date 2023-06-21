import icons from '#hami/ui/icons';

import { dispatch } from '@gecut/signal';

import { addNotificationDialog } from '../dialogs/add-notification-dialog';

import type { M3 } from '@gecut/ui-kit';

export function newNotificationFAB(): M3.Types.FABContent {
  return {
    component: 'fab',
    type: 'fab',
    size: 'medium',
    variant: 'secondary',
    ariaLabel: 'New Notification',
    slotList: [
      {
        component: 'icon',
        type: 'svg',
        SVG: icons.outlineRounded.addAlert,
        slot: 'icon',
      },
    ],
    customConfig: (target) => {
      target.addEventListener('click', () => {
        dispatch('dialog', addNotificationDialog());
      });

      return target;
    },
  };
}
