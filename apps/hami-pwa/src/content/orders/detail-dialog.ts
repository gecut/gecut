import icons from '#hami/ui/icons';

import i18n from '@gecut/i18n';

import type { Projects } from '@gecut/types';
import type { M3 } from '@gecut/ui-kit';

export function orderDetailDialog(
  order: Projects.Hami.OrderModel
): M3.Types.DialogContent {
  return {
    component: 'dialog',
    type: 'dialog',
    fullscreen: true,
    slotList: [
      {
        component: 'typography',
        type: 'h3',
        style: 'title-large',
        slotList: [i18n.msg('order_dialog_information_title')],
      },
      {
        component: 'surface-card',
        type: 'elevated',
        styles: { marginBottom: 'calc(3*var(--sys-spacing-track,8px))' },
        slotList: [
          {
            component: 'list',
            type: 'list',
            slotList: [
              {
                component: 'list-item',
                type: 'list-item',
                headline: `${i18n.msg(
                  'order_dialog_information_customer_name'
                )} ${order.customer.firstName} ${order.customer.lastName}`,
                slotList: [
                  {
                    component: 'icon',
                    type: 'svg',
                    slot: 'start',
                    SVG: icons.outlineRounded.person,
                  },
                ],
              },
              {
                component: 'list-item',
                type: 'list-item',
                headline: [
                  i18n.msg('order_dialog_information_customer_project'),
                  order.customerProject.projectName,
                ].join(' '),
                supportingText: order.customerProject.projectAddress,
                multiLineSupportingText: true,
                slotList: [
                  {
                    component: 'icon',
                    type: 'svg',
                    slot: 'start',
                    SVG: icons.outlineRounded.locationOn,
                  },
                ],
              },
              {
                component: 'list-item',
                type: 'list-item',
                headline: i18n.msg(
                  'order_dialog_information_customer_evacuation_date'
                ),
                supportingText: i18n.date(order.evacuationDate),
                trailingSupportingText: i18n.date(order.evacuationDate, {
                  dateStyle: 'short',
                }),
                slotList: [
                  {
                    component: 'icon',
                    type: 'svg',
                    slot: 'start',
                    SVG: icons.outlineRounded.event,
                  },
                ],
              },
              {
                component: 'list-item',
                type: 'list-item',
                headline: i18n.msg(
                  'order_dialog_information_customer_registration_date'
                ),
                supportingText: i18n.date(order.registrationDate),
                trailingSupportingText: i18n.date(order.registrationDate, {
                  dateStyle: 'short',
                }),
                slotList: [
                  {
                    component: 'icon',
                    type: 'svg',
                    slot: 'start',
                    SVG: icons.outlineRounded.eventAvailable,
                  },
                ],
              },
              {
                component: 'list-item',
                type: 'list-item',
                headline: i18n.msg(order.status),
                slotList: [
                  {
                    component: 'icon',
                    type: 'svg',
                    slot: 'start',
                    SVG: icons.outline.workspaces,
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        component: 'typography',
        type: 'h3',
        style: 'title-large',
        slotList: [i18n.msg('order_dialog_products_title')],
      },
      {
        component: 'list',
        type: 'list',
        styles: { marginBottom: 'calc(3*var(--sys-spacing-track,8px))' },
        styleVars: { '--_container-color': 'transparent' },
        slotList: order.productList.map((product) => ({
          component: 'surface-card',
          type: 'elevated',
          slotList: [
            {
              component: 'list-item',
              type: 'list-item',
              headline: product.product.name,
              trailingSupportingText: `${product.quantity}-${product.unit}`,
              slotList: [
                {
                  component: 'icon',
                  type: 'svg',
                  slot: 'start',
                  SVG: icons.outlineRounded.inventory2,
                },
              ],
            },
            {
              component: 'list-item',
              type: 'list-item',
              headline: `${i18n.msg(
                'order_dialog_products_sales_price'
              )} ${i18n.int(product.salesPrice)}`,
              trailingSupportingText: `${i18n.msg(
                'order_dialog_products_purchase_price'
              )} ${i18n.int(product.purchasePrice)}`,
              slotList: [
                {
                  component: 'icon',
                  type: 'svg',
                  slot: 'start',
                  SVG: icons.filledRounded.attachMoney,
                },
              ],
            },
          ],
          styles: { marginBottom: 'calc(1.5*var(--sys-spacing-track,8px))' },
          // headline: product.product.name,
          // supportingText: [
          //   [
          //     i18n.msg('order_dialog_products_purchase_price'),
          //     i18n.int(product.purchasePrice),
          //   ].join(': '),
          //   [
          //     i18n.msg('order_dialog_products_sales_price'),
          //     i18n.int(product.salesPrice),
          //   ].join(': '),
          //   [i18n.msg('order_dialog_products_unit'), product.unit].join(
          //     ': '
          //   ),
          // ].join('  '),
          // multiLineSupportingText: true,
          // trailingSupportingText: i18n.int(product.quantity),
        })),
      },
      {
        component: 'button',
        type: 'text',
        label: i18n.msg('customers_information_box_dialog_close_label'),
        slot: 'footer',
        customConfig: (target) => {
          target.setAttribute('dialogAction', 'close');

          return target;
        },
      },
    ],
  };
}
