import i18n from '#hami/ui/i18n';

import { dispatch } from '@gecut/signal';

import { customerProfileDialog } from './customer-profile-dialog';

import type { Projects } from '@gecut/types';
import type { M3 } from '@gecut/ui-kit';

export function customerAddProjectDialog(
  customer: Projects.Hami.CustomerModel
): M3.Types.DialogContent {
  return {
    component: 'dialog',
    type: 'dialog',
    slotList: [
      {
        component: 'button',
        type: 'text',
        label: i18n.message('customers_information_box_dialog_close_label'),
        slot: 'footer',
        customConfig: (target) => {
          target.setAttribute('dialogAction', 'close');

          return target;
        },
      },
    ],
    customConfig: (target) => {
      target.addEventListener('closing', () => {
        dispatch('dialog', customerProfileDialog(customer));
      });

      return target;
    },
  };
}
