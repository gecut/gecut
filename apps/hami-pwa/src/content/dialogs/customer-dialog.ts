import i18n from '@gecut/i18n';

import { customerCard } from '../cards/customer-card';
import { customerProjectListCard } from '../cards/customer-projects-list-card';
import { orderCard } from '../cards/order-card';
import { headingPageTypography } from '../typographies/heading-page-typography';

import type { Projects } from '@gecut/types';
import type { M3 } from '@gecut/ui-kit';

export function customerDialog(
  customer: Projects.Hami.CustomerModel
): M3.Types.DialogContent {
  return {
    component: 'dialog',
    type: 'dialog',
    fullscreen: true,
    slotList: [
      headingPageTypography(i18n.msg('content_customer_dialog'), {
        slot: 'headline',
      }),
      customerCard(customer),
      customerProjectListCard(customer.projectList),
      ...customer.orderList.slice(0, 15).map((order) => orderCard(order)),
      {
        component: 'button',
        type: 'text',
        label: i18n.msg('customers_information_box_dialog_close_label'),
        slot: 'footer',
        customConfig: (target) => {
          target.setAttribute('dialogAction', 'close');

          return target;
        },
      },
    ],
  };
}
