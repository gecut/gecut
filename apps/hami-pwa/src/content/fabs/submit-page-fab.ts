import icons from '#hami/ui/icons';
import { routerGo } from '#hami/ui/router';

import { getValue, request } from '@gecut/signal';

import type { Projects } from '@gecut/types';
import type { M3 } from '@gecut/ui-kit';

export function submitFAB(): M3.Types.FABContent {
  return {
    component: 'fab',
    type: 'fab',
    attributes: {
      size: 'medium',
      variant: 'primary',
      styles: {
        position: 'absolute',
        bottom: '16px',
        'inset-inline-start': '16px',
        'z-index': 'var(--sys-zindex-sticky)',
      },
    },
    children: [
      {
        component: 'icon',
        type: 'svg',
        attributes: { slot: 'icon' },
        SVG: icons.filledRounded.done,
      },
    ],
    transformers: (target) => {
      target.addEventListener('click', async () => {
        const order = getValue('order');
        await request('put-order', order as Projects.Hami.Order);
        request('order-storage', {});
        routerGo('/orders');
      });

      return target;
    },
  };
}
