import { validators } from '#hami/controllers/default-validators';
import icons from '#hami/ui/icons';

import i18n from '@gecut/i18n';
import { dispatch, request } from '@gecut/signal';

import { headingPageTypography } from '../typographies/heading-page-typography';

import type { Projects } from '@gecut/types';
import type { M3 } from '@gecut/ui-kit';

export function addSupplierDialog(
  supplier?: Projects.Hami.SupplierModel
): M3.Types.DialogContent {
  const isEdit = supplier != null;
  const title = isEdit ? i18n.msg('edit-supplier') : i18n.msg('add-supplier');

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
                supplier: [
                  {
                    component: 'text-field',
                    type: 'filled',
                    inputType: 'text',
                    name: 'uniqueCode',
                    label: i18n.msg('unique-code'),
                    validator: validators('required', 'numeric'),
                    value: supplier?.uniqueCode,
                  },
                  [
                    {
                      component: 'text-field',
                      type: 'filled',
                      inputType: 'text',
                      name: 'firstName',
                      label: i18n.msg('first-name'),
                      validator: validators('required'),
                      value: supplier?.firstName,
                    },
                    {
                      component: 'text-field',
                      type: 'filled',
                      inputType: 'text',
                      name: 'lastName',
                      label: i18n.msg('last-name'),
                      validator: validators('required'),
                      value: supplier?.lastName,
                    },
                  ],
                  {
                    component: 'text-field',
                    type: 'filled',
                    inputType: 'tel',
                    name: 'phoneNumber',
                    textDirection: 'ltr',
                    label: i18n.msg('phone-number'),
                    validator: validators('required', 'phone'),
                    value: supplier?.phoneNumber,
                  },
                  {
                    component: 'text-field',
                    type: 'filled',
                    inputType: 'text',
                    name: 'address',
                    label: i18n.msg('address'),
                    validator: validators('required'),
                    value: supplier?.address,
                  },
                  {
                    component: 'text-field',
                    type: 'filled',
                    inputType: 'text',
                    name: 'description',
                    label: i18n.msg('description'),
                    value: supplier?.description,
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
                    'supplier'
                  ] as unknown as Projects.Hami.Supplier;

                  if (data != null) {
                    if (supplier != null) {
                      data.id = supplier.id;
                    }

                    await request('patch-supplier-storage', {
                      data: [data],
                    });
                    request('supplier-storage', {});
                    dispatch('dialog', null);
                    dispatch('snack-bar', {
                      component: 'snack-bar',
                      type: 'ellipsis-message',
                      message: i18n.msg('supplier-successfully-registered'),
                      align: 'bottom',
                      duration: 2_000,
                      closeButton: true,
                    });
                  }
                }
              },
            },
            activeSlide: 'supplier',
          },
        ],
      },
      {
        component: 'button',
        type: 'text',
        hasIcon: true,
        label: i18n.msg('delete'),
        disabled: !(isEdit === true),
        slot: 'footer',
        slotList: [
          {
            component: 'icon',
            type: 'svg',
            slot: 'icon',
            SVG: icons.outlineRounded.delete,
          },
        ],
        customConfig: (target) => {
          target.addEventListener('click', async () => {
            if (supplier == null) return;

            supplier.active = false;

            target.disabled = true;
            await request('patch-supplier-storage', {
              data: [supplier],
            });
            target.disabled = false;

            request('supplier-storage', {});
            dispatch('dialog', null);
            dispatch('snack-bar', {
              component: 'snack-bar',
              type: 'ellipsis-message',
              message: i18n.msg('supplier-successfully-deleted'),
              align: 'bottom',
              duration: 2_000,
              closeButton: true,
            });
          });

          return target;
        },
      },
      {
        component: 'button',
        type: 'text',
        label: i18n.msg('close'),
        slot: 'footer',
        customConfig: (target) => {
          target.addEventListener('click', () => {
            dispatch('dialog', null);
          });

          return target;
        },
      },
    ],
  };
}
