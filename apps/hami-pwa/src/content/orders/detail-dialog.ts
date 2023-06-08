import i18n from '#hami/ui/i18n';

import IconAttachMoneyRounded from 'virtual:icons/material-symbols/attach-money-rounded';
import IconEventAvailableOutlineRounded from 'virtual:icons/material-symbols/event-available-outline-rounded';
import IconEventOutlineRounded from 'virtual:icons/material-symbols/event-outline-rounded';
import IconInventory2OutlineRounded from 'virtual:icons/material-symbols/inventory-2-outline-rounded';
import IconLocationOnOutlineRounded from 'virtual:icons/material-symbols/location-on-outline-rounded';
import IconPersonOutlineRounded from 'virtual:icons/material-symbols/person-outline-rounded';
import IconWorkspacesOutline from 'virtual:icons/material-symbols/workspaces-outline';

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
        slotList: [i18n.message('order_dialog_information_title')],
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
                headline: `${i18n.message(
                  'order_dialog_information_customer_name'
                )} ${order.customer.firstName} ${order.customer.lastName}`,
                slotList: [
                  {
                    component: 'icon',
                    type: 'svg',
                    slot: 'start',
                    SVG: IconPersonOutlineRounded,
                  },
                ],
              },
              {
                component: 'list-item',
                type: 'list-item',
                headline: [
                  i18n.message('order_dialog_information_customer_project'),
                  order.customerProject.projectName,
                ].join(' '),
                supportingText: order.customerProject.projectAddress,
                multiLineSupportingText: true,
                slotList: [
                  {
                    component: 'icon',
                    type: 'svg',
                    slot: 'start',
                    SVG: IconLocationOnOutlineRounded,
                  },
                ],
              },
              {
                component: 'list-item',
                type: 'list-item',
                headline: i18n.message(
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
                    SVG: IconEventOutlineRounded,
                  },
                ],
              },
              {
                component: 'list-item',
                type: 'list-item',
                headline: i18n.message(
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
                    SVG: IconEventAvailableOutlineRounded,
                  },
                ],
              },
              {
                component: 'list-item',
                type: 'list-item',
                headline: i18n.message(order.status),
                slotList: [
                  {
                    component: 'icon',
                    type: 'svg',
                    slot: 'start',
                    SVG: IconWorkspacesOutline,
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
        slotList: [i18n.message('order_dialog_products_title')],
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
                  SVG: IconInventory2OutlineRounded,
                },
              ],
            },
            {
              component: 'list-item',
              type: 'list-item',
              headline: `${i18n.message(
                'order_dialog_products_sales_price'
              )} ${i18n.numberFormat(product.salesPrice)}`,
              trailingSupportingText: `${i18n.message(
                'order_dialog_products_purchase_price'
              )} ${i18n.numberFormat(product.purchasePrice)}`,
              slotList: [
                {
                  component: 'icon',
                  type: 'svg',
                  slot: 'start',
                  SVG: IconAttachMoneyRounded,
                },
              ],
            },
          ],
          styles: { marginBottom: 'calc(1.5*var(--sys-spacing-track,8px))' },
          // headline: product.product.name,
          // supportingText: [
          //   [
          //     i18n.message('order_dialog_products_purchase_price'),
          //     i18n.numberFormat(product.purchasePrice),
          //   ].join(': '),
          //   [
          //     i18n.message('order_dialog_products_sales_price'),
          //     i18n.numberFormat(product.salesPrice),
          //   ].join(': '),
          //   [i18n.message('order_dialog_products_unit'), product.unit].join(
          //     ': '
          //   ),
          // ].join('  '),
          // multiLineSupportingText: true,
          // trailingSupportingText: i18n.numberFormat(product.quantity),
        })),
      },
      {
        component: 'button',
        type: 'text',
        label: i18n.message('customers_information_box_dialog_close_label'),
        slot: 'footer',
        customConfig: (target) => {
          target.setAttribute('dialogAction', 'close');

          return target;
        },
      },
    ],
  };
}
