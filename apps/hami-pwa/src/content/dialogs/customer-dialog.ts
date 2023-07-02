import i18n from '@gecut/i18n';
import { dispatch } from '@gecut/signal';

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
      headingPageTypography(i18n.msg('customer-profile'), {
        slot: 'headline',
      }),
      customerCard(customer),
      customerProjectListCard(customer.projectList),
      ...customer.orderList.slice(0, 15).map((order) => orderCard(order)),
      {
        component: 'button',
        type: 'text',
        label: i18n.msg('close'),
        slot: 'footer',
        customConfig: (target) => {
          target.addEventListener('click', () => {
            dispatch('dialog', null);
          });

          return target;
        },
      },
    ],
  };
}
