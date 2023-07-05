import { validators } from '#hami/controllers/default-validators';

import i18n from '@gecut/i18n';
import { dispatch, request } from '@gecut/signal';

import { headingPageTypography } from '../typographies/heading-page-typography';

import type { Projects } from '@gecut/types';
import type { M3 } from '@gecut/ui-kit';

export function addCustomerDialog(): M3.Types.DialogContent {
  return {
    component: 'dialog',
    type: 'dialog',
    attributes: { fullscreen: true },
    children: [
      headingPageTypography(i18n.msg('add-customer'), {
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
                  customer: [
                    {
                      component: 'text-field',
                      type: 'filled',
                      attributes: {
                        inputType: 'text',
                        name: 'firstName',
                        label: i18n.msg('first-name'),
                      },
                      validator: validators('required'),
                    },
                    {
                      component: 'text-field',
                      type: 'filled',
                      attributes: {
                        inputType: 'text',
                        name: 'lastName',
                        label: i18n.msg('last-name'),
                      },
                      validator: validators('required'),
                    },
                    {
                      component: 'text-field',
                      type: 'filled',
                      attributes: {
                        inputType: 'tel',
                        name: 'phoneNumber',
                        textDirection: 'ltr',
                        label: i18n.msg('phone-number'),
                      },
                      validator: validators('required', 'phone'),
                    },
                    {
                      component: 'text-field',
                      type: 'filled',
                      attributes: {
                        inputType: 'text',
                        name: 'description',
                        label: i18n.msg('description'),
                      },
                    },
                    {
                      component: 'button',
                      type: 'filled',
                      disabled: 'auto',
                      action: 'form_submit',
                      children: [i18n.msg('add-customer')],
                    },
                  ],
                },
                onSubmit: async (event) => {
                  if (event.validate === true && event.values != null) {
                    const customer = event.values[
                      'customer'
                    ] as unknown as Projects.Hami.Customer;
                    const userId = localStorage.getItem('USER_ID');

                    if (customer != null && userId != null) {
                      customer.creatorId = userId;

                      await request('patch-customer-storage', {
                        data: [customer],
                      });
                      request('customer-storage', {});
                      dispatch('dialog', null);
                      dispatch('snack-bar', {
                        component: 'snack-bar',
                        type: 'ellipsis-message',
                        attributes: {
                          message: i18n.msg('customer-successfully-registered'),
                          align: 'bottom',
                          duration: 2_000,
                          closeButton: true,
                        },
                      });
                    }
                  }
                },
              },
              activeSlide: 'customer',
            },
          },
        ],
      },
      {
        component: 'button',
        type: 'text',
        attributes: { slot: 'footer' },
        children: [i18n.msg('close')],
        events: {
          click: () => {
            dispatch('dialog', null);
          },
        },
      },
    ],
  };
}
