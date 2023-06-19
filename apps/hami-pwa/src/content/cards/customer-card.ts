import { isFieldExits } from '#hami/controllers/is-field-exists';
import icons from '#hami/ui/icons';

import i18n from '@gecut/i18n';
import { dispatch } from '@gecut/signal';

import { addCustomerProjectDialog } from '../dialogs/add-customer-project-dialog';

import type { Projects } from '@gecut/types';
import type { M3 } from '@gecut/ui-kit';

export function customerCard(
  customer: Projects.Hami.CustomerModel
): M3.Types.SurfaceCardContent {
  return {
    component: 'surface-card',
    type: 'elevated',
    styles: {
      'margin-top': 'var(--sys-spacing-track,8px)',
      'margin-bottom': 'calc(2*var(--sys-spacing-track,8px))',
      padding: 'calc(2*var(--sys-spacing-track,8px))',
      'padding-top': 'var(--sys-spacing-track,8px)',
    },
    slotList: [
      {
        component: 'typography',
        type: 'h1',
        slotList: [customer.firstName, ' ', customer.lastName],
        style: 'title-large',
        styles: {
          color: 'var(--md-sys-color-primary)',
        },
      },
      {
        component: 'typography',
        type: 'p',
        slotList: [
          i18n.msg('phone-number'),
          ': ',
          i18n.phone(customer.phoneNumber, true),
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
          i18n.msg('number-of-projects'),
          ': ',
          i18n.int(customer.projectList.length),
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
          i18n.int(customer.orderList.length),
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
          i18n.msg('creator'),
          ': ',
          customer.creator.firstName,
          ' ',
          customer.creator.lastName,
        ],
        styles: {
          color: 'var(--md-sys-color-surface-variant)',
          margin: '0',
        },
      },
      {
        component: 'typography',
        type: 'p',
        hidden: isFieldExits(customer.description) === false,
        slotList: [i18n.msg('description'), ': ', customer.description],
        styles: {
          color: 'var(--md-sys-color-surface-variant)',
          margin: '0',
        },
      },
      {
        component: 'button',
        type: 'filled',
        label: i18n.msg('add-project'),
        styles: {
          'margin-inline-start': 'auto',
          'margin-top': 'calc(2*var(--sys-spacing-track,8px))',
        },
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
            dispatch('dialog', addCustomerProjectDialog(customer.id));
          });

          return target;
        },
      },
    ],
  };
}
