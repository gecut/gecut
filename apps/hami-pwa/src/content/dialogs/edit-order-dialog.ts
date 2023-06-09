import { isFieldExits } from '#hami/controllers/is-field-exists';
import { numberHelper } from '#hami/controllers/text-field-number-helper';
import icons from '#hami/ui/icons';

import i18n from '@gecut/i18n';
import { dispatch, request } from '@gecut/signal';
import { join, sanitizer } from '@gecut/utilities';

import { orderStatusSelect } from '../selects/order-status-select';
import { orderSupplierSelect } from '../selects/order-supplier-select';
import { headingPageTypography } from '../typographies/heading-page-typography';

import type { FormTextFieldContent } from '@gecut/form-builder';
import type { Projects } from '@gecut/types';
import type { M3 } from '@gecut/ui-kit';

export function editOrderDialog(
    order: Projects.Hami.OrderModel,
    suppliers: Projects.Hami.Supplier[]
): M3.Types.DialogContent {
  return {
    component: 'dialog',
    type: 'dialog',
    attributes: { fullscreen: true },
    children: [
      headingPageTypography(i18n.msg('order-code') + ': ' + order.id, {
        attributes: { slot: 'headline' },
      }),
      {
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
            type: 'p',
            children: [i18n.msg('status'), ': ', i18n.msg(order.status)],
            attributes: {
              styles: {
                color: 'var(--md-sys-color-surface-variant)',
                margin: '0',
              },
            },
          },
          {
            component: 'typography',
            type: 'p',
            children: [
              i18n.msg('evacuation-date'),
              ': ',
              i18n.date(order.evacuationDate),
            ],
            attributes: {
              styles: {
                color: 'var(--md-sys-color-surface-variant)',
                margin: '0',
              },
            },
          },
          {
            component: 'typography',
            type: 'p',
            children: [
              i18n.msg('registration-date'),
              ': ',
              i18n.date(order.registrationDate),
            ],
            attributes: {
              styles: {
                color: 'var(--md-sys-color-surface-variant)',
                margin: '0',
              },
            },
          },
          {
            component: 'typography',
            type: 'p',
            children: [
              i18n.msg('customer-name'),
              ': ',
              sanitizer.str(order.customer?.firstName),
              ' ',
              sanitizer.str(order.customer?.lastName),
            ],
            attributes: {
              styles: {
                color: 'var(--md-sys-color-surface-variant)',
                margin: '0',
              },
            },
          },
          {
            component: 'typography',
            type: 'p',
            children: [
              i18n.msg('supplier-name'),
              ': ',
              sanitizer.str(order.supplier?.firstName),
              ' ',
              sanitizer.str(order.supplier?.lastName),
            ],
            attributes: {
              styles: {
                color: 'var(--md-sys-color-surface-variant)',
                margin: '0',
              },
            },
          },
          {
            component: 'typography',
            type: 'p',
            children: [
              i18n.msg('description'),
              ': ',
              sanitizer.str(order.description),
            ],
            attributes: {
              hidden: order.description === 'no-description',
              styles: {
                color: 'var(--md-sys-color-surface-variant)',
                margin: '0',
              },
            },
          },
          {
            component: 'typography',
            type: 'p',
            children: [
              i18n.msg('creator'),
              ': ',
              sanitizer.str(order.creator?.firstName),
              ' ',
              sanitizer.str(order.creator?.lastName),
            ],
            attributes: {
              styles: {
                color: 'var(--md-sys-color-surface-variant)',
                margin: '0',
              },
            },
          },
          {
            component: 'typography',
            type: 'p',
            children: [
              i18n.msg('project-address'),
              ': ',
              i18n.msg(sanitizer.str(order.customerProject?.projectAddress)),
            ],
            attributes: {
              hidden:
                isFieldExits(order.customerProject?.projectAddress) === false,
              styles: {
                color: 'var(--md-sys-color-surface-variant)',
                margin: '0',
              },
            },
          },
          {
            component: 'form-builder',
            type: 'form-builder',
            attributes: {
              activeSlide: 'initial',
              styles: {
                'margin-top': '16px',
                '--padding-side': '0',
              },
              data: {
                slides: {
                  initial: [
                    orderStatusSelect(order.status),
                    orderSupplierSelect(suppliers, order.supplierId),
                    ...order.productList.map(
                        (orderProduct): FormTextFieldContent[] => [
                          {
                            component: 'text-field',
                            type: 'filled',
                            attributes: {
                              inputType: 'number',
                              name: `purchase-${orderProduct.productId}`,
                              label: join(
                                  ' ',
                                  orderProduct.product.name,
                                  i18n.int(orderProduct.quantity),
                                  orderProduct.unit
                              ),
                              value: String(orderProduct.purchasePrice),
                            },
                            transformers: (target) => {
                              target.addEventListener('input', () => {
                                target = numberHelper(target);
                              });

                              return target;
                            },
                          },
                          {
                            component: 'text-field',
                            type: 'filled',
                            attributes: {
                              inputType: 'number',
                              name: `sales-${orderProduct.productId}`,
                              label: join(
                                  ' ',
                                  i18n.msg('sales-price'),
                                  orderProduct.product.name,
                                  '(',
                                  i18n.int(orderProduct.quantity),
                                  orderProduct.unit,
                                  ')'
                              ),
                              value: String(orderProduct.salesPrice),
                            },
                            transformers: (target) => {
                              target.addEventListener('input', () => {
                                target = numberHelper(target);
                              });

                              return target;
                            },
                          },
                        ]
                    ),
                    {
                      component: 'button',
                      type: 'tonal',
                      action: 'form_submit',
                      disabled: 'auto',
                      children: [i18n.msg('edit-order')],
                    },
                  ],
                },
                onSubmit: async (event) => {
                  if (event.validate === true && event.values != null) {
                    const formValues = event.values[
                        'initial'
                    ] as unknown as Record<string, string> &
                      Pick<Projects.Hami.Order, 'supplierId' | 'status'>;

                    const _order: Partial<Projects.Hami.Order> = {
                      id: order.id,
                      status: formValues.status,
                      supplierId: formValues.supplierId,
                      productList: [],
                    };
                    const productList = order.productList.map(
                        (
                            orderProduct: Projects.Hami.OrderProduct & {
                          product?: unknown;
                        }
                        ) => {
                          delete orderProduct.product;

                          return orderProduct as Projects.Hami.OrderProduct;
                        }
                    );

                    _order.productList = productList.map((orderProduct) => {
                      const purchasePrice = Number(
                          formValues[`purchase-${orderProduct.productId}`]
                      );
                      const salesPrice = Number(
                          formValues[`sales-${orderProduct.productId}`]
                      );

                      if (Number.isNaN(purchasePrice) === false) {
                        orderProduct.purchasePrice = purchasePrice;
                      }
                      if (Number.isNaN(salesPrice) === false) {
                        orderProduct.salesPrice = salesPrice;
                      }

                      return orderProduct;
                    });

                    await request('put-order', _order);
                    request('order-storage', {});
                    dispatch('dialog', null);
                  }
                },
              },
            },
          },
        ],
      },
      {
        component: 'button',
        type: 'text',
        attributes: {
          hasIcon: true,
          label: i18n.msg('delete'),
          slot: 'footer',
        },
        children: [
          {
            component: 'icon',
            type: 'svg',
            attributes: { slot: 'icon' },
            SVG: icons.outlineRounded.delete,
          },
        ],
        transformers: (target) => {
          target.addEventListener('click', async () => {
            if (order == null) return;

            target.disabled = true;
            await request('put-order', {
              id: order.id,
              active: false,
            });
            target.disabled = false;

            request('order-storage', {});
            dispatch('dialog', null);
            dispatch('snack-bar', {
              component: 'snack-bar',
              type: 'ellipsis-message',
              attributes: {
                message: i18n.msg('order-successfully-deleted'),
                align: 'bottom',
                duration: 2_000,
                closeButton: true,
              },
            });
          });

          return target;
        },
      },
      {
        component: 'button',
        type: 'text',
        children: [i18n.msg('close')],
        attributes: { slot: 'footer' },
        events: {
          click: () => {
            dispatch('dialog', null);
          },
        },
      },
    ],
  };
}
