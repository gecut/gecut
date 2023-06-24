import icons from '#hami/ui/icons';
import { routerGo, urlForName } from '#hami/ui/router';

import i18n from '@gecut/i18n';

import type { M3 } from '@gecut/ui-kit';

export function newOrderFAB(): M3.Types.FABContent {
  return {
    component: 'fab',
    type: 'fab',
    size: 'medium',
    variant: 'primary',
    label: i18n.msg('new-order'),
    slotList: [
      {
        component: 'icon',
        type: 'svg',
        SVG: icons.filledRounded.add,
        slot: 'icon',
      },
    ],
    customConfig: (target) => {
      target.addEventListener('click', () => {
        routerGo(urlForName('NewOrder'));
      });

      return target;
    },
  };
}
