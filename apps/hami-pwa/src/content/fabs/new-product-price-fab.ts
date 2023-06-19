import icons from '#hami/ui/icons';

import i18n from '@gecut/i18n';

import type { M3 } from '@gecut/ui-kit';

export function newProductPriceFAB(): M3.Types.FABContent {
  return {
    component: 'fab',
    type: 'fab',
    size: 'medium',
    variant: 'primary',
    label: i18n.msg('new-product-price'),
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
