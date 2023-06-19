import { defaultValidators } from '#hami/controllers/default-validators';

import i18n from '@gecut/i18n';
import { dispatch, request } from '@gecut/signal';

import { headingPageTypography } from '../typographies/heading-page-typography';

import type { Projects } from '@gecut/types';
import type { M3 } from '@gecut/ui-kit';

export function addCustomerDialog(): M3.Types.DialogContent {
  return {
    component: 'dialog',
    type: 'dialog',
    fullscreen: true,
    slotList: [
      headingPageTypography(i18n.msg('content_add_customer_dialog'), {
        slot: 'headline',
      }),
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
            component: 'form-builder',
            type: 'form-builder',
            styles: {
              marginTop: '8px',
            },
            styleVars: {
              '--padding-side': '0',
            },
            data: {
              slides: {
                customer: [
                  {
                    component: 'text-field',
                    type: 'filled',
                    inputType: 'text',
                    name: 'firstName',
                    label: i18n.msg(
                      'content_add_customer_dialog_first_name'
                    ),
                    validator: [defaultValidators.required],
                  },
                  {
                    component: 'text-field',
                    type: 'filled',
                    inputType: 'text',
                    name: 'lastName',
                    label: i18n.msg(
                      'content_add_customer_dialog_last_name'
                    ),
                    validator: [defaultValidators.required],
                  },
                  {
                    component: 'text-field',
                    type: 'filled',
                    inputType: 'tel',
                    name: 'phoneNumber',
                    textDirection: 'ltr',
                    label: i18n.msg(
                      'content_add_customer_dialog_phone_number'
                    ),
                    validator: [
                      defaultValidators.required,
                      defaultValidators.phone,
                    ],
                  },
                  {
                    component: 'text-field',
                    type: 'filled',
                    inputType: 'text',
                    name: 'description',
                    label: i18n.msg(
                      'content_add_customer_dialog_description'
                    ),
                  },
                  {
                    component: 'button',
                    type: 'filled',
                    disabled: 'auto',
                    action: 'form_submit',
                    label: i18n.msg(
                      'customers_information_box_dialog_send_to_server_label'
                    ),
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
                  }
                }
              },
            },
            activeSlide: 'customer',
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
