import { isFieldExits } from '#hami/controllers/is-field-exists';
import icons from '#hami/ui/icons';

import i18n from '@gecut/i18n';
import { dispatch } from '@gecut/signal';
import { join, sanitizer } from '@gecut/utilities';

import { editOrderDialog } from '../dialogs/edit-order-dialog';
import { logger } from '../logger';

import type { Projects } from '@gecut/types';
import type { M3 } from '@gecut/ui-kit';

export function orderCard(
  order: Projects.Hami.OrderModel,
  editable = false,
  suppliers: Projects.Hami.Supplier[] = []
): M3.Types.SurfaceCardContent {
  logger.methodArgs?.('orderCard', { order, editable, suppliers });

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
        slotList: [i18n.msg('order-code'), ': ', order.id],
        classes: ['surface-card__title'],
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
            dispatch('dialog', editOrderDialog(order, suppliers));
          });

          return target;
        },
      },
      {
        component: 'typography',
        type: 'p',
        slotList: [i18n.msg('status'), ': ', i18n.msg(order.status)],
        classes: ['surface-card__paragraph'],
      },
      {
        component: 'typography',
        type: 'p',
        slotList: [
          i18n.msg('evacuation-date'),
          ': ',
          i18n.date(order.evacuationDate),
        ],
        classes: ['surface-card__paragraph'],
      },
      {
        component: 'typography',
        type: 'p',
        slotList: [
          i18n.msg('registration-date'),
          ': ',
          i18n.date(order.registrationDate),
        ],
        classes: ['surface-card__paragraph'],
      },
      {
        component: 'typography',
        type: 'p',
        slotList: [
          i18n.msg('customer-name'),
          ': ',
          sanitizer.str(order.customer?.firstName),
          ' ',
          sanitizer.str(order.customer?.lastName),
        ],
        hidden:
          isFieldExits(order.customer?.firstName, order.customer?.lastName) ===
          false,
        classes: ['surface-card__paragraph'],
      },
      {
        component: 'typography',
        type: 'p',
        slotList: [
          i18n.msg('supplier-name'),
          ': ',
          sanitizer.str(order.supplier?.firstName),
          ' ',
          sanitizer.str(order.supplier?.lastName),
        ],
        hidden:
          isFieldExits(order.supplier?.firstName, order.supplier?.lastName) ===
          false,
        classes: ['surface-card__paragraph'],
      },
      {
        component: 'typography',
        type: 'p',
        slotList: [
          i18n.msg('description'),
          ': ',
          sanitizer.str(order.description),
        ],
        hidden: isFieldExits(order.description) === false,
        classes: ['surface-card__paragraph'],
      },
      {
        component: 'typography',
        type: 'p',
        slotList: [
          i18n.msg('creator'),
          ': ',
          sanitizer.str(order.creator?.firstName),
          ' ',
          sanitizer.str(order.creator?.lastName),
        ],
        hidden:
          isFieldExits(order.creator?.firstName, order.creator?.lastName) ===
          false,
        classes: ['surface-card__paragraph'],
      },
      {
        component: 'typography',
        type: 'p',
        slotList: [
          i18n.msg('project-address'),
          ': ',
          sanitizer.str(order.customerProject?.projectAddress),
        ],
        hidden: isFieldExits(order.customerProject?.projectAddress) === false,
        classes: ['surface-card__paragraph'],
      },
      {
        component: 'surface-card',
        type: 'filled',
        styles: {
          'margin-top': 'var(--sys-spacing-track,8px)',
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
              supportingText: join(
                ' - ',
                i18n.int(orderProduct.salesPrice),
                i18n.int(orderProduct.purchasePrice)
              ),
              trailingSupportingText: join(
                ' ',
                i18n.int(orderProduct.quantity),
                orderProduct.unit
              ),
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
          'margin-top': 'calc(2*var(--sys-spacing-track,8px))',
        },
        slotList: [
          {
            component: 'button',
            type: 'tonal',
            label: i18n.msg('sales-invoice'),
            styles: {
              'flex-grow': '1',
            },
          },
          {
            component: 'button',
            type: 'tonal',
            label: i18n.msg('purchase-invoice'),
            styles: {
              'flex-grow': '1',
            },
          },
        ],
      },
    ],
  };
}
