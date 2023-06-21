import { isFieldExits } from '#hami/controllers/is-field-exists';
import icons from '#hami/ui/icons';

import i18n from '@gecut/i18n';
import { dispatch } from '@gecut/signal';

import { addSupplierDialog } from '../dialogs/add-supplier-dialog';

import type { Projects } from '@gecut/types';
import type { M3 } from '@gecut/ui-kit';

export function supplierCard(
  supplier: Projects.Hami.SupplierModel,
  editable = false
): M3.Types.SurfaceCardContent {
  return {
    component: 'surface-card',
    type: 'elevated',
    styles: {
      position: 'relative',
      'margin-top': 'calc(.2*var(--sys-spacing-track,8px))',
      'margin-bottom': 'var(--sys-spacing-track,8px)',
      padding:
        'var(--sys-spacing-track,8px) calc(2*var(--sys-spacing-track,8px)) calc(2*var(--sys-spacing-track,8px))',
    },
    slotList: [
      {
        component: 'typography',
        type: 'h1',
        slotList: [supplier.firstName, ' ', supplier.lastName],
        style: 'title-large',
        styles: {
          color: 'var(--md-sys-color-primary)',
        },
      },
      {
        component: 'icon-button',
        type: 'standard',
        iconSVG: icons.outlineRounded.edit,
        disabled: editable !== true,
        styles: {
          position: 'absolute',
          top: '16px',
          'inset-inline-end': '16px',
        },
        customConfig: (target) => {
          target.addEventListener('click', () => {
            dispatch('dialog', addSupplierDialog(supplier));
          });

          return target;
        },
      },
      {
        component: 'typography',
        type: 'p',
        slotList: [i18n.msg('unique-code'), ': ', supplier.uniqueCode],
        styles: {
          color: 'var(--md-sys-color-surface-variant)',
          margin: '0',
        },
      },
      {
        component: 'typography',
        type: 'p',
        slotList: [
          i18n.msg('phone-number'),
          ': ',
          i18n.phone(supplier.phoneNumber, true),
        ],
        styles: {
          color: 'var(--md-sys-color-surface-variant)',
          margin: '0',
        },
      },
      {
        component: 'typography',
        type: 'p',
        slotList: [
          i18n.msg('number-of-orders'),
          ': ',
          i18n.int(supplier.orderList.length),
        ],
        styles: {
          color: 'var(--md-sys-color-surface-variant)',
          margin: '0',
        },
      },
      {
        component: 'typography',
        type: 'p',
        hidden: isFieldExits(supplier.address) === false,
        slotList: [i18n.msg('address'), ': ', supplier.address],
        styles: {
          color: 'var(--md-sys-color-surface-variant)',
          margin: '0',
        },
      },
      {
        component: 'typography',
        type: 'p',
        hidden: isFieldExits(supplier.description) === false,
        slotList: [i18n.msg('description'), ': ', supplier.description],
        styles: {
          color: 'var(--md-sys-color-surface-variant)',
          margin: '0',
        },
      },
      // {
      //   component: 'button',
      //   type: 'filled',
      //   label: i18n.msg('add-phone-number'),
      //   styles: {
      //     'margin-inline-start': 'auto',
      //     'margin-top': 'calc(2*var(--sys-spacing-track,8px))',
      //   },
      //   slotList: [
      //     {
      //       component: 'icon',
      //       type: 'svg',
      //       SVG: icons.filledRounded.add,
      //       slot: 'icon',
      //     },
      //   ],
      // },
    ],
  };
}
