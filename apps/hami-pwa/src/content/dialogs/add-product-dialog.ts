import { validators } from '#hami/controllers/default-validators';
import icons from '#hami/ui/icons';

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
    attributes: { fullscreen: true },
    children: [
      headingPageTypography(title, {
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
            component: 'form-builder',
            type: 'form-builder',
            attributes: {
              styles: {
                'margin-top': '8px',
                '--padding-side': '0',
              },
              data: {
                slides: {
                  product: [
                    {
                      component: 'text-field',
                      type: 'filled',
                      attributes: {
                        inputType: 'text',
                        name: 'code',
                        label: i18n.msg('code'),
                        value: product?.code,
                      },
                      validator: validators('required', 'numeric'),
                    },
                    {
                      component: 'text-field',
                      type: 'filled',
                      attributes: {
                        inputType: 'text',
                        name: 'name',
                        label: i18n.msg('name'),
                        value: product?.name,
                      },
                      validator: validators('required'),
                    },
                    [
                      {
                        component: 'text-field',
                        type: 'filled',
                        attributes: {
                          inputType: 'text',
                          name: 'category',
                          label: i18n.msg('category'),
                          value: product?.category,
                        },
                        validator: validators('required'),
                      },
                      {
                        component: 'text-field',
                        type: 'filled',
                        attributes: {
                          inputType: 'text',
                          name: 'brand',
                          label: i18n.msg('brand'),
                          value: product?.brand,
                        },
                        validator: validators('required'),
                      },
                    ],
                    {
                      component: 'text-field',
                      type: 'filled',
                      attributes: {
                        inputType: 'text',
                        name: 'unit',
                        label: i18n.msg('unit'),
                        value: product?.unit,
                      },
                      validator: validators('required'),
                    },
                    {
                      component: 'text-field',
                      type: 'filled',
                      attributes: {
                        inputType: 'text',
                        name: 'description',
                        label: i18n.msg('description'),
                        value: product?.description,
                      },
                    },
                    {
                      component: 'button',
                      type: 'filled',
                      disabled: 'auto',
                      action: 'form_submit',
                      children: [title],
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

                      await request('patch-product-storage', {
                        data: [data],
                      });
                      request('product-storage', {});
                      dispatch('dialog', null);
                      dispatch('snack-bar', {
                        component: 'snack-bar',
                        type: 'ellipsis-message',
                        attributes: {
                          message: i18n.msg('product-successfully-registered'),
                          align: 'bottom',
                          duration: 2_000,
                          closeButton: true,
                        },
                      });
                    }
                  }
                },
              },
              activeSlide: 'product',
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
          disabled: !(isEdit === true),
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
            if (product == null) return;

            product.active = false;

            target.disabled = true;
            await request('patch-product-storage', {
              data: [product],
            });
            target.disabled = false;

            request('product-storage', {});
            dispatch('dialog', null);
            dispatch('snack-bar', {
              component: 'snack-bar',
              type: 'ellipsis-message',
              attributes: {
                message: i18n.msg('product-successfully-deleted'),
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
