import icons from '#hami/ui/icons';

import { dispatch } from '@gecut/signal';

import type { M3 } from '@gecut/ui-kit';

export function previousPageFAB(): M3.Types.FABContent {
  return {
    component: 'fab',
    type: 'fab',
    size: 'medium',
    variant: 'surface',
    slotList: [
      {
        component: 'icon',
        type: 'svg',
        slot: 'icon',
        SVG: icons.filledRounded.arrowBack,
      },
    ],
    customConfig: (target) => {
      target.addEventListener('click', () => {
        dispatch('new-order-state', 'previous');
      });

      return target;
    },
  };
}
