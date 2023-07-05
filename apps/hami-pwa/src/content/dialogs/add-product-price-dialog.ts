import { validators } from '#hami/controllers/default-validators';
import { numberHelper } from '#hami/controllers/text-field-number-helper';
import icons from '#hami/ui/icons';

import i18n from '@gecut/i18n';
import { dispatch, request } from '@gecut/signal';

import { headingPageTypography } from '../typographies/heading-page-typography';

import type { Projects } from '@gecut/types';
import type { M3 } from '@gecut/ui-kit';

export function addProductPriceDialog(
  productPrice?: Projects.Hami.ProductPrice
): M3.Types.DialogContent {
  const isEdit = productPrice != null;
  const title = isEdit
    ? i18n.msg('edit-product-price')
    : i18n.msg('add-product-price');

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
                  productPrice: [
                    {
                      component: 'text-field',
                      type: 'filled',
                      attributes: {
                        inputType: 'text',
                        name: 'name',
                        label: i18n.msg('name'),
                        value: productPrice?.name,
                      },
                      validator: validators('required'),
                    },
                    [
                      {
                        component: 'text-field',
                        type: 'filled',
                        attributes: {
                          inputType: 'number',
                          name: 'minPrice',
                          label: i18n.msg('min-price'),
                          value: productPrice?.minPrice.toString(),
                        },
                        validator: validators('required'),
                        transformers: (target) => {
                          target.addEventListener('click', () => {
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
                          name: 'normalPrice',
                          label: i18n.msg('normal-price'),
                          value: productPrice?.normalPrice.toString(),
                        },
                        validator: validators('required'),
                        transformers: (target) => {
                          target.addEventListener('click', () => {
                            target = numberHelper(target);
                          });

                          return target;
                        },
                      },
                    ],
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
                    const _productPrice = event.values[
                      'productPrice'
                    ] as unknown as Projects.Hami.ProductPrice;

                    if (_productPrice != null) {
                      if (productPrice?.id != null) {
                        _productPrice.id = productPrice.id;
                      }

                      await request('patch-product-price-storage', {
                        data: [_productPrice],
                      });
                      request('product-price-storage', {});
                      dispatch('dialog', null);
                      dispatch('snack-bar', {
                        component: 'snack-bar',
                        type: 'ellipsis-message',
                        attributes: {
                          message: i18n.msg(
                            'product-price-successfully-registered'
                          ),
                          align: 'bottom',
                          duration: 2_000,
                          closeButton: true,
                        },
                      });
                    }
                  }
                },
              },
              activeSlide: 'productPrice',
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
          disabled: !(isEdit === true),
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
            if (productPrice == null) return;

            productPrice.active = false;

            target.disabled = true;
            await request('patch-product-price-storage', {
              data: [productPrice],
            });
            target.disabled = false;

            request('product-price-storage', {});
            dispatch('dialog', null);
            dispatch('snack-bar', {
              component: 'snack-bar',
              type: 'ellipsis-message',
              attributes: {
                message: i18n.msg('product-price-successfully-deleted'),
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
