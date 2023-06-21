import icons from '#hami/ui/icons';

import i18n from '@gecut/i18n';

import type { Projects } from '@gecut/types';
import type { M3 } from '@gecut/ui-kit';

export function supplierPhoneNumberItem(
  supplierPhoneNumber: Projects.Hami.SupplierPhoneNumber
): M3.Types.ListItemContent {
  return {
    component: 'list-item',
    type: 'list-item-link',
    headline: supplierPhoneNumber.name,
    supportingText: i18n.phone(supplierPhoneNumber.phoneNumber),
    href: `tel:${supplierPhoneNumber.phoneNumber}`,
    classes: ['supplier-phone-number-item'],
    styleVars: {
      '--_list-item-trailing-supporting-text-color':
        'var(--md-sys-color-primary)',
    },
    slotList: [
      {
        component: 'icon',
        type: 'svg',
        slot: 'start',
        SVG: icons.outlineRounded.call,
      },
    ],
  };
}

export function supplierPhoneNumberList(
  supplier: Projects.Hami.SupplierModel
): M3.Types.ListContent {
  const items = [
    {
      name: i18n.msg('main'),
      phoneNumber: supplier.phoneNumber,
    },
    ...supplier.phoneNumberList,
  ];

  return {
    component: 'list',
    type: 'list',
    styles: {
      'border-radius': '12px',
      overflow: 'hidden',
    },
    slotList: items.map((item) => supplierPhoneNumberItem(item)),
  };
}

export function supplierPhoneNumberListCard(
  supplier: Projects.Hami.SupplierModel
): M3.Types.SurfaceCardContent {
  return {
    component: 'surface-card',
    type: 'elevated',
    styles: { 'margin-bottom': 'calc(2*var(--sys-spacing-track,8px))' },
    slotList: [supplierPhoneNumberList(supplier)],
  };
}
