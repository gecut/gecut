import icons from '#hami/ui/icons';

import i18n from '@gecut/i18n';
import { sanitizer } from '@gecut/utilities';

import type { Projects } from '@gecut/types';
import type { M3 } from '@gecut/ui-kit';

export function supplierPhoneNumberItem(
  supplierPhoneNumber: Projects.Hami.SupplierPhoneNumber
): M3.Types.ListItemContent {
  return {
    component: 'list-item',
    type: 'list-item-link',
    attributes: {
      headline: supplierPhoneNumber.name,
      supportingText: i18n.phone(supplierPhoneNumber.phoneNumber),
      href: `tel:${supplierPhoneNumber.phoneNumber}`,
      classes: ['supplier-phone-number-item'],
      styles: {
        '--_list-item-trailing-supporting-text-color':
          'var(--md-sys-color-primary)',
      },
    },
    children: [
      {
        component: 'icon',
        type: 'svg',
        attributes: { slot: 'start' },
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
      phoneNumber: sanitizer.str(supplier.phoneNumber),
    },
    ...supplier.phoneNumberList,
  ];

  return {
    component: 'list',
    type: 'list',
    attributes: {
      styles: {
        'border-radius': '12px',
        overflow: 'hidden',
      },
    },
    children: items.map((item) => supplierPhoneNumberItem(item)),
  };
}

export function supplierPhoneNumberListCard(
  supplier: Projects.Hami.SupplierModel
): M3.Types.SurfaceCardContent {
  return {
    component: 'surface-card',
    type: 'elevated',
    attributes: {
      styles: { 'margin-bottom': 'calc(2*var(--sys-spacing-track,8px))' },
    },
    children: [supplierPhoneNumberList(supplier)],
  };
}
