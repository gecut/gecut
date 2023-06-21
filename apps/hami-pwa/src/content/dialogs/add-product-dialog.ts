import { validators } from '#hami/controllers/default-validators';

import i18n from '@gecut/i18n';
import { dispatch, request } from '@gecut/signal';

import { headingPageTypography } from '../typographies/heading-page-typography';

import type { Projects } from '@gecut/types';
import type { M3 } from '@gecut/ui-kit';

export function addProductDialog(
  product?: Projects.Hami.Product
): M3.Types.DialogContent {
  const isEdit = product != null;
  const title = isEdit ? i18n.msg('edit-product') : i18n.msg('add-product');

  return {
    component: 'dialog',
    type: 'dialog',
    fullscreen: true,
    slotList: [
      headingPageTypography(title, {
        slot: 'headline',
      }),
      {
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
            component: 'form-builder',
            type: 'form-builder',
            styles: {
              'margin-top': '8px',
            },
            styleVars: {
              '--padding-side': '0',
            },
            data: {
              slides: {
                product: [
                  {
                    component: 'text-field',
                    type: 'filled',
                    inputType: 'text',
                    name: 'uniqueCode',
                    label: i18n.msg('code'),
                    validator: validators('required', 'numeric'),
                    value: product?.code,
                  },
                  {
                    component: 'text-field',
                    type: 'filled',
                    inputType: 'text',
                    name: 'name',
                    label: i18n.msg('name'),
                    validator: validators('required'),
                    value: product?.name,
                  },
                  [
                    {
                      component: 'text-field',
                      type: 'filled',
                      inputType: 'text',
                      name: 'category',
                      label: i18n.msg('category'),
                      validator: validators('required'),
                      value: product?.category,
                    },
                    {
                      component: 'text-field',
                      type: 'filled',
                      inputType: 'text',
                      name: 'brand',
                      label: i18n.msg('brand'),
                      validator: validators('required'),
                      value: product?.brand,
                    },
                  ],
                  {
                    component: 'text-field',
                    type: 'filled',
                    inputType: 'text',
                    name: 'unit',
                    label: i18n.msg('unit'),
                    validator: validators('required'),
                    value: product?.unit,
                  },
                  {
                    component: 'text-field',
                    type: 'filled',
                    inputType: 'text',
                    name: 'description',
                    label: i18n.msg('description'),
                    value: product?.description,
                  },
                  {
                    component: 'button',
                    type: 'filled',
                    disabled: 'auto',
                    action: 'form_submit',
                    label: title,
                  },
                ],
              },
              onSubmit: async (event) => {
                if (event.validate === true && event.values != null) {
                  const data = event.values[
                    'product'
                  ] as unknown as Projects.Hami.Product;

                  if (data != null) {
                    if (product != null) {
                      data.id = product.id;
                    }

                    // await request('patch-product-storage', {
                    //   data: [data],
                    // });
                    request('product-storage', {});
                    dispatch('dialog', null);
                    dispatch('snack-bar', {
                      component: 'snack-bar',
                      type: 'ellipsis-message',
                      message: i18n.msg('product-successfully-registered'),
                      align: 'bottom',
                      duration: 2_000,
                      closeButton: true,
                    });
                  }
                }
              },
            },
            activeSlide: 'product',
          },
        ],
      },
      {
        component: 'button',
        type: 'text',
        label: i18n.msg('close'),
        slot: 'footer',
        customConfig: (target) => {
          target.setAttribute('dialogAction', 'close');

          return target;
        },
      },
    ],
  };
}
