import i18n from '#hami/ui/i18n';

import { addProjectForm } from './add-project-form';

import type { Projects } from '@gecut/types';
import type { M3 } from '@gecut/ui-kit';

export function customerAddProjectDialog(
  _customer: Projects.Hami.CustomerModel
): M3.Types.DialogContent {
  return {
    component: 'dialog',
    type: 'dialog',
    fullscreen: true,
    slotList: [
      addProjectForm,
      {
        component: 'button',
        type: 'text',
        label: i18n.message(
          'customers_information_box_dialog_send_to_server_label'
        ),
        slot: 'footer',
      },
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
  };
}
