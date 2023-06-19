import i18n from '@gecut/i18n';
import { dispatch, request } from '@gecut/signal';

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
    fullscreen: true,
    slotList: [
      headingPageTypography(
        i18n.msg('content_order_card_id') + ': ' + order.id,
        {
          slot: 'headline',
        }
      ),
      {
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
            type: 'p',
            slotList: [
              i18n.msg('content_order_card_status'),
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
              i18n.msg('content_order_card_evacuation_date'),
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
              i18n.msg('content_order_card_registration_date'),
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
              i18n.msg('content_order_card_customer_name'),
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
              i18n.msg('content_order_card_supplier_name'),
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
              i18n.msg('content_order_card_description'),
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
              i18n.msg('content_order_card_creator'),
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
              i18n.msg('content_order_card_project_address'),
              ': ',
              i18n.msg(order.customerProject.projectAddress),
            ],
            styles: {
              color: 'var(--md-sys-color-surface-variant)',
              margin: '0',
            },
          },
          {
            component: 'form-builder',
            type: 'form-builder',
            activeSlide: 'initial',
            styles: {
              marginTop: '16px',
            },
            styleVars: {
              '--padding-side': '0',
            },
            data: {
              slides: {
                initial: [
                  orderStatusSelect(order.status),
                  orderSupplierSelect(suppliers, order.supplierId),
                  ...order.productList.map(
                    (orderProduct): FormTextFieldContent => ({
                      component: 'text-field',
                      type: 'filled',
                      inputType: 'number',
                      name: orderProduct.productId,
                      label: `${orderProduct.product.name} (${i18n.int(
                        orderProduct.quantity
                      )} ${orderProduct.unit})`,
                      value: String(orderProduct.purchasePrice),
                      customConfig: (target) => {
                        target.addEventListener('input', () => {
                          if (!Number.isNaN(target.valueAsNumber)) {
                            target.supportingText = i18n.int(
                              target.valueAsNumber
                            );
                          } else {
                            target.supportingText = '';
                          }
                        });

                        return target;
                      },
                    })
                  ),
                  {
                    component: 'button',
                    type: 'tonal',
                    action: 'form_submit',
                    disabled: 'auto',
                    label: i18n.msg('content_order_card_submit_button'),
                  },
                ],
              },
              onSubmit: async (event) => {
                if (event.validate === true && event.values != null) {
                  const formValues = event.values[
                    'initial'
                  ] as unknown as Record<string, string> &
                    Pick<Projects.Hami.Order, 'supplierId' | 'status'>;

                  order.status = formValues.status;
                  order.supplierId = formValues.supplierId;

                  order.productList = order.productList.map((orderProduct) => {
                    const purchasePrice = Number(
                      formValues[orderProduct.productId]
                    );

                    if (Number.isNaN(purchasePrice) === false) {
                      orderProduct.purchasePrice = purchasePrice;
                    }

                    return orderProduct;
                  });

                  await request('put-order', order);
                  request('order-storage', {});
                  dispatch('dialog', null);
                }
              },
            },
          },
        ],
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
