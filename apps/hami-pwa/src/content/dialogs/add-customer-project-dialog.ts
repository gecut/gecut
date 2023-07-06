import { validators } from '#hami/controllers/default-validators';

import i18n from '@gecut/i18n';
import { dispatch, request } from '@gecut/signal';

import { headingPageTypography } from '../typographies/heading-page-typography';

import type { Projects } from '@gecut/types';
import type { M3 } from '@gecut/ui-kit';

export function addCustomerProjectDialog(
    customerId: string
): M3.Types.DialogContent {
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
                  project: [
                    {
                      component: 'text-field',
                      type: 'filled',
                      attributes: {
                        inputType: 'text',
                        name: 'projectName',
                        label: i18n.msg('project-name'),
                      },
                      validator: validators('required'),
                    },
                    {
                      component: 'text-field',
                      type: 'filled',
                      attributes: {
                        inputType: 'text',
                        name: 'projectAddress',
                        label: i18n.msg('project-address'),
                      },
                      validator: validators('required'),
                    },
                    {
                      component: 'text-field',
                      type: 'filled',
                      attributes: {
                        inputType: 'text',
                        name: 'supervisorName',
                        label: i18n.msg('supervisor-name'),
                      },
                      validator: validators('required'),
                    },
                    {
                      component: 'text-field',
                      type: 'filled',
                      attributes: {
                        inputType: 'tel',
                        name: 'supervisorPhone',
                        label: i18n.msg('supervisor-phone'),
                        textDirection: 'ltr',
                      },
                      validator: validators('required', 'phone'),
                    },
                    {
                      component: 'button',
                      type: 'filled',
                      disabled: 'auto',
                      action: 'form_submit',
                      children: [i18n.msg('add-project')],
                    },
                  ],
                },
                onSubmit: async (event) => {
                  if (event.validate === true && event.values != null) {
                    const project = event.values[
                        'project'
                    ] as unknown as Projects.Hami.CustomerProject;

                    if (project != null) {
                      await request('patch-customer-project-storage', {
                        data: [project],
                        customerId,
                      });
                      request('customer-storage', {});
                      dispatch('dialog', null);
                      dispatch('snack-bar', {
                        component: 'snack-bar',
                        type: 'ellipsis-message',
                        attributes: {
                          message: i18n.msg(
                              'project-was-successfully-registered'
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
              activeSlide: 'customer',
            },
          },
        ],
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
