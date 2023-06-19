import icons from '#hami/ui/icons';

import type { M3 } from '@gecut/ui-kit';

export function newNotificationFAB(): M3.Types.FABContent {
  return {
    component: 'fab',
    type: 'fab',
    size: 'medium',
    variant: 'secondary',
    slotList: [
      {
        component: 'icon',
        type: 'svg',
        SVG: icons.outlineRounded.addAlert,
        slot: 'icon',
      },
    ],
  };
}
