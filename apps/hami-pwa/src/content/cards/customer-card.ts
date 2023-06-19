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
      marginTop: 'var(--sys-spacing-track,8px)',
      marginBottom: 'calc(2*var(--sys-spacing-track,8px))',
      padding: 'calc(2*var(--sys-spacing-track,8px))',
      paddingTop: 'var(--sys-spacing-track,8px)',
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
          i18n.msg('content_customer_dialog_phone_number'),
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
          i18n.msg('content_customer_dialog_projects_count'),
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
          i18n.msg('content_customer_dialog_orders_count'),
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
          i18n.msg('content_customer_dialog_creator'),
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
        slotList: [
          i18n.msg('content_customer_dialog_description'),
          ': ',
          customer.description,
        ],
        styles: {
          color: 'var(--md-sys-color-surface-variant)',
          margin: '0',
        },
      },
      {
        component: 'button',
        type: 'filled',
        label: i18n.msg('customers_information_box_dialog_add_project'),
        styles: {
          marginInlineStart: 'auto',
          marginTop: 'calc(2*var(--sys-spacing-track,8px))',
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
            dispatch('dialog', addCustomerProjectDialog());
          });

          return target;
        },
      },
    ],
  };
}
