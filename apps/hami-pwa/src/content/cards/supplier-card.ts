import icons from '#hami/ui/icons';

import i18n from '@gecut/i18n';
import { dispatch } from '@gecut/signal';
import { join, sanitizer } from '@gecut/utilities';

import { addSupplierDialog } from '../dialogs/add-supplier-dialog';
import { paragraphTypographies } from '../typographies/surface-card-paragraph-typography';

import type { Projects } from '@gecut/types';
import type { M3 } from '@gecut/ui-kit';

export function supplierCard(
  supplier: Projects.Hami.SupplierModel,
  editable = false
): M3.Types.SurfaceCardContent {
  return {
    component: 'surface-card',
    type: 'elevated',
    attributes: {
      styles: {
        position: 'relative',
        'margin-top': 'calc(.2*var(--sys-spacing-track,8px))',
        'margin-bottom': 'var(--sys-spacing-track,8px)',
        padding:
          'var(--sys-spacing-track,8px) calc(2*var(--sys-spacing-track,8px)) calc(2*var(--sys-spacing-track,8px))',
      },
    },
    children: [
      {
        component: 'typography',
        type: 'h1',
        children: [
          sanitizer.str(supplier.firstName),
          ' ',
          sanitizer.str(supplier.lastName),
        ],
        attributes: { classes: ['surface-card__title'] },
      },
      {
        component: 'icon-button',
        type: 'standard',
        iconSVG: icons.outlineRounded.edit,
        attributes: {
          disabled: editable !== true,
          styles: {
            position: 'absolute',
            top: '16px',
            'inset-inline-end': '16px',
          },
        },
        transformers: (target) => {
          target.addEventListener('click', () => {
            dispatch('dialog', addSupplierDialog(supplier));
          });

          return target;
        },
      },
      ...paragraphTypographies([
        join(': ', i18n.msg('unique-code'), supplier.uniqueCode),
        join(
          ': ',
          i18n.msg('phone-number'),
          i18n.phone(sanitizer.str(supplier.phoneNumber), true)
        ),
        join(
          ': ',
          i18n.msg('number-of-orders'),
          i18n.int(supplier.orderList.length)
        ),
        join(': ', i18n.msg('address'), sanitizer.str(supplier.address)),
        join(
          ': ',
          i18n.msg('description'),
          sanitizer.str(supplier.description)
        ),
      ]),
    ],
  };
}
