import icons from '#hami/ui/icons';

import i18n from '@gecut/i18n';
import { dispatch } from '@gecut/signal';
import { join, sanitizer } from '@gecut/utilities';

import { editOrderDialog } from '../dialogs/edit-order-dialog';
import { logger } from '../logger';
import { paragraphTypographies } from '../typographies/surface-card-paragraph-typography';

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
    type: order.status === 'awaitingConfirmation' ? 'filled' : 'elevated',
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
        children: [i18n.msg('order-code'), ': ', order.id],
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
            dispatch('dialog', editOrderDialog(order, suppliers));
          });

          return target;
        },
      },
      ...paragraphTypographies([
        join(': ', i18n.msg('status'), i18n.msg(order.status)),
        join(
          ': ',
          i18n.msg('evacuation-date'),
          i18n.date(order.evacuationDate)
        ),
        join(
          ': ',
          i18n.msg('registration-date'),
          i18n.date(order.registrationDate)
        ),
        join(
          '',
          i18n.msg('customer-name'),
          ': ',
          sanitizer.str(order.customer?.firstName),
          ' ',
          sanitizer.str(order.customer?.lastName)
        ),
        join(
          '',
          i18n.msg('supplier-name'),
          ': ',
          sanitizer.str(order.supplier?.firstName),
          ' ',
          sanitizer.str(order.supplier?.lastName)
        ),
        join(': ', i18n.msg('description'), sanitizer.str(order.description)),
        join(
          '',
          i18n.msg('creator'),
          ': ',
          sanitizer.str(order.creator?.firstName),
          ' ',
          sanitizer.str(order.creator?.lastName)
        ),
        join(
          ': ',
          i18n.msg('project-address'),
          sanitizer.str(order.customerProject?.projectAddress)
        ),
      ]),
      {
        component: 'surface-card',
        type: 'filled',
        attributes: {
          styles: {
            'margin-top': 'var(--sys-spacing-track,8px)',
            background: 'var(--md-ref-palette-neutral-variant5)',
          },
        },
        children: [
          {
            component: 'list',
            type: 'list',
            attributes: {
              styles: {
                '--_container-color': 'transparent',
              },
            },
            children: order.productList.map((orderProduct) => ({
              component: 'list-item',
              type: 'list-item',
              headline: orderProduct.product.name,
              attributes: {
                supportingText: join(
                  ' ',
                  i18n.msg('sales') + ':',
                  i18n.int(orderProduct.salesPrice ?? 0),
                  ' - ',
                  i18n.msg('purchase') + ':',
                  i18n.int(orderProduct.purchasePrice ?? 0)
                ),
                trailingSupportingText: join(
                  ' ',
                  i18n.int(orderProduct.quantity),
                  orderProduct.unit
                ),
                styleVars: {
                  '--_list-item-container-color': 'transparent',
                },
              },
            })),
          },
        ],
      },
      {
        component: 'division',
        type: 'div',
        attributes: {
          styles: {
            display: 'flex',
            gap: 'calc(2*var(--sys-spacing-track,8px))',
            'margin-top': 'calc(2*var(--sys-spacing-track,8px))',
          },
        },
        children: [
          {
            component: 'button',
            type: 'tonal',
            attributes: {
              styles: {
                'flex-grow': '1',
              },
            },
            children: [i18n.msg('sales-invoice')],
          },
          {
            component: 'button',
            type: 'tonal',
            attributes: {
              styles: {
                'flex-grow': '1',
              },
            },
            children: [i18n.msg('purchase-invoice')],
          },
        ],
      },
    ],
  };
}
