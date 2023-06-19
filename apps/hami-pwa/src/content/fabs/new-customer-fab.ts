import icons from '#hami/ui/icons';

import i18n from '@gecut/i18n';
import { dispatch } from '@gecut/signal';

import { addCustomerDialog } from '../dialogs/add-customer-dialog';

import type { M3 } from '@gecut/ui-kit';

export function newCustomerFAB(): M3.Types.FABContent {
  return {
    component: 'fab',
    type: 'fab',
    size: 'medium',
    variant: 'primary',
    label: i18n.msg('customers_information_fab_new'),
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
        dispatch('dialog', addCustomerDialog());
      });

      return target;
    },
  };
}
