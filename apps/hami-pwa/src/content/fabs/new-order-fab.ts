import i18n from '#hami/ui/i18n';
import icons from '#hami/ui/icons';

import type { M3 } from '@gecut/ui-kit';

export function newOrderFAB(): M3.Types.FABContent {
  return {
    component: 'fab',
    type: 'fab',
    size: 'medium',
    variant: 'primary',
    label: i18n.message('content_order_fab_new'),
    slotList: [
      {
        component: 'icon',
        type: 'svg',
        SVG: icons.filledRounded.add,
        slot: 'icon',
      },
    ],
  };
}
