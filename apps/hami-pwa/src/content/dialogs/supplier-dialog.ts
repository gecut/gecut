import i18n from '@gecut/i18n';
import { dispatch } from '@gecut/signal';

import { orderCard } from '../cards/order-card';
import { supplierCard } from '../cards/supplier-card';
import { supplierPhoneNumberListCard } from '../cards/supplier-phone-number-list-card';
import { headingPageTypography } from '../typographies/heading-page-typography';

import type { Projects } from '@gecut/types';
import type { M3 } from '@gecut/ui-kit';

export function supplierDialog(
    supplier: Projects.Hami.SupplierModel,
    editable = false
): M3.Types.DialogContent {
  return {
    component: 'dialog',
    type: 'dialog',
    attributes: { fullscreen: true },
    children: [
      headingPageTypography(i18n.msg('supplier-profile'), {
        attributes: { slot: 'headline' },
      }),
      supplierCard(supplier, editable),
      supplierPhoneNumberListCard(supplier),
      ...supplier.orderList.slice(0, 15).map((order) => orderCard(order)),
      {
        component: 'button',
        type: 'text',
        children: [i18n.msg('close')],
        attributes: { slot: 'footer' },
        events: {
          click: () => {
            dispatch('dialog', null);
          },
        },
      },
    ],
  };
}
