import icons from '#hami/ui/icons';
import { routerGo, urlForName } from '#hami/ui/router';

import i18n from '@gecut/i18n';

import type { M3 } from '@gecut/ui-kit';

export function newOrderFAB(): M3.Types.FABContent {
  return {
    component: 'fab',
    type: 'fab',
    attributes: {
      size: 'medium',
      variant: 'primary',
      label: i18n.msg('new-order'),
    },
    children: [
      {
        component: 'icon',
        type: 'svg',
        SVG: icons.filledRounded.add,
        attributes: { slot: 'icon' },
      },
    ],
    transformers: (target) => {
      target.addEventListener('click', () => {
        routerGo(urlForName('NewOrder'));
      });

      return target;
    },
  };
}
