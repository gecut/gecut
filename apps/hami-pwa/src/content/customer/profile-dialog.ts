import icons from '#hami/ui/icons';

import i18n from '@gecut/i18n';
import { dispatch } from '@gecut/signal';

import { customerAddProjectDialog } from './add-project-dialog';

import type { Projects } from '@gecut/types';
import type { M3 } from '@gecut/ui-kit';

export function customerProfileDialog(
  customer: Projects.Hami.CustomerModel
): M3.Types.DialogContent {
  return {
    component: 'dialog',
    type: 'dialog',
    fullscreen: true,
    slotList: [
      {
        component: 'surface-card',
        type: 'elevated',
        styles: {
          marginTop: 'var(--sys-spacing-track,8px)',
          marginBottom: 'calc(2*var(--sys-spacing-track,8px))',
        },
        slotList: [
          {
            component: 'list',
            type: 'list',
            slotList: [
              {
                component: 'list-item',
                type: 'list-item',
                headline: `${customer.firstName} ${customer.lastName}`,
                slotList: [
                  {
                    component: 'icon',
                    type: 'svg',
                    slot: 'start',
                    SVG: icons.outlineRounded.person,
                  },
                ],
              },
              {
                component: 'list-item',
                type: 'list-item',
                headline: `${i18n.phone(customer.phoneNumber)}`,
                slotList: [
                  {
                    component: 'icon',
                    type: 'svg',
                    slot: 'start',
                    SVG: icons.outlineRounded.call,
                  },
                ],
              },
              {
                component: 'list-item',
                type: 'list-item',
                headline: [
                  i18n.int(customer.orderList.length),
                  i18n.msg('customers_information_box_dialog_order'),
                ].join(' '),
                slotList: [
                  {
                    component: 'icon',
                    type: 'svg',
                    slot: 'start',
                    SVG: icons.outlineRounded.shoppingCard,
                  },
                ],
              },
              {
                component: 'list-item',
                type: 'list-item',
                headline: i18n.msg(
                  'customers_information_box_dialog_description'
                ),
                supportingText: customer.description,
                multiLineSupportingText: true,
                slotList: [
                  {
                    component: 'icon',
                    type: 'svg',
                    slot: 'start',
                    SVG: icons.outlineRounded.description,
                  },
                ],
              },
              { component: 'divider', type: 'divider' },
              {
                component: 'division',
                type: 'div',
                slotList: [
                  {
                    component: 'button',
                    type: 'tonal',
                    label: i18n.msg(
                      'customers_information_box_dialog_edit_customer'
                    ),
                    slot: 'footer',
                    slotList: [
                      {
                        component: 'icon',
                        type: 'svg',
                        SVG: icons.outlineRounded.edit,
                        slot: 'icon',
                      },
                    ],
                  },
                  {
                    component: 'button',
                    type: 'tonal',
                    label: i18n.msg(
                      'customers_information_box_dialog_add_project'
                    ),
                    slot: 'footer',
                    slotList: [
                      {
                        component: 'icon',
                        type: 'svg',
                        SVG: icons.filledRounded.add,
                        slot: 'icon',
                      },
                    ],
                    customConfig: (target) => {
                      target.addEventListener('click', () => {
                        dispatch('dialog', customerAddProjectDialog(customer));
                      });

                      return target;
                    },
                  },
                ],
                styles: {
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 'calc(1.5 * var(--sys-spacing-track))',
                  padding: 'calc(1.5 * var(--sys-spacing-track))',
                },
              },
              { component: 'divider', type: 'divider' },
              {
                component: 'division',
                type: 'span',
                styles: {
                  display: 'flex',
                  justifyContent: 'center',
                  paddingTop: 'var(--sys-spacing-track)',
                  fontSize: 'var(--md-sys-typescale-body-small-font-size)',
                  fontWeight: 'var(--md-sys-typescale-body-small-font-weight)',
                  color: 'var(--md-sys-color-on-surface-variant)',
                },
                customConfig: (target) => {
                  target.innerHTML = [
                    i18n.msg('customers_information_box_dialog_created_by'),
                    customer.creator.firstName,
                    customer.creator.lastName,
                  ].join(' ');

                  return target;
                },
              },
            ],
          },
        ],
      },
      {
        component: 'surface-card',
        type: 'elevated',
        hidden: customer.projectList.length === 0,
        slotList: [
          {
            component: 'list',
            type: 'list',
            slotList: customer.projectList.map((project) => ({
              component: 'list-item',
              type: 'list-item',
              headline: project.projectName,
              supportingText: project.projectAddress,
              multiLineSupportingText: true,
              slotList: [
                {
                  component: 'icon',
                  type: 'svg',
                  SVG: icons.outlineRounded.locationOn,
                  slot: 'start',
                },
              ],
            })),
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
