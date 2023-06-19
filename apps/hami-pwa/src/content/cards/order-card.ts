import icons from '#hami/ui/icons';

import i18n from '@gecut/i18n';
import { dispatch } from '@gecut/signal';

import { editOrderDialog } from '../dialogs/edit-order-dialog';

import type { Projects } from '@gecut/types';
import type { M3 } from '@gecut/ui-kit';

export function orderCard(
  order: Projects.Hami.OrderModel,
  editable = false,
  suppliers: Projects.Hami.Supplier[] = []
): M3.Types.SurfaceCardContent {
  return {
    component: 'surface-card',
    type: 'elevated',
    styles: {
      position: 'relative',
      marginTop: 'calc(.2*var(--sys-spacing-track,8px))',
      marginBottom: 'var(--sys-spacing-track,8px)',
      padding:
        'var(--sys-spacing-track,8px) calc(2*var(--sys-spacing-track,8px)) calc(2*var(--sys-spacing-track,8px))',
    },
    slotList: [
      {
        component: 'typography',
        type: 'h1',
        slotList: [i18n.msg('order-code'), ': ', order.id],
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
          insetInlineEnd: '16px',
        },
        customConfig: (target) => {
          target.addEventListener('click', () => {
            dispatch('dialog', editOrderDialog(order, suppliers));
          });

          return target;
        },
      },
      {
        component: 'typography',
        type: 'p',
        slotList: [
          i18n.msg('status'),
          ': ',
          i18n.msg(order.status),
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
          i18n.msg('evacuation-date'),
          ': ',
          i18n.date(order.evacuationDate),
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
          i18n.msg('registration-date'),
          ': ',
          i18n.date(order.registrationDate),
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
          i18n.msg('customer-name'),
          ': ',
          order.customer.firstName,
          ' ',
          order.customer.lastName,
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
          i18n.msg('supplier-name'),
          ': ',
          order.supplier.firstName,
          ' ',
          order.supplier.lastName,
        ],
        styles: {
          color: 'var(--md-sys-color-surface-variant)',
          margin: '0',
        },
      },
      {
        component: 'typography',
        type: 'p',
        hidden: order.description === 'no-description',
        slotList: [
          i18n.msg('description'),
          ': ',
          order.description,
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
          order.creator.firstName,
          ' ',
          order.creator.lastName,
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
          i18n.msg('project-address'),
          ': ',
          i18n.msg(order.customerProject.projectAddress),
        ],
        styles: {
          color: 'var(--md-sys-color-surface-variant)',
          margin: '0',
        },
      },
      {
        component: 'surface-card',
        type: 'filled',
        styles: {
          marginTop: 'var(--sys-spacing-track,8px)',
          background: 'var(--md-ref-palette-neutral-variant5)',
        },
        slotList: [
          {
            component: 'list',
            type: 'list',
            styleVars: {
              '--_container-color': 'transparent',
            },
            slotList: order.productList.map((orderProduct) => ({
              component: 'list-item',
              type: 'list-item',
              headline: orderProduct.product.name,
              supportingText: `${i18n.int(
                orderProduct.salesPrice
              )} - ${i18n.int(orderProduct.purchasePrice)}`,
              trailingSupportingText: `${i18n.int(
                orderProduct.quantity
              )} ${orderProduct.unit}`,
              styleVars: {
                '--_list-item-container-color': 'transparent',
              },
            })),
          },
        ],
      },
      {
        component: 'division',
        type: 'div',
        styles: {
          display: 'flex',
          gap: 'calc(2*var(--sys-spacing-track,8px))',
          marginTop: 'calc(2*var(--sys-spacing-track,8px))',
        },
        slotList: [
          {
            component: 'button',
            type: 'tonal',
            label: i18n.msg('sales-invoice'),
            styles: {
              flexGrow: '1',
            },
          },
          {
            component: 'button',
            type: 'tonal',
            label: i18n.msg('purchase-invoice'),
            styles: {
              flexGrow: '1',
            },
          },
        ],
      },
    ],
  };
}
