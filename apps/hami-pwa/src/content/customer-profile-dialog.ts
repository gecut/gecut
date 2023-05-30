import i18n from '#hami/ui/i18n';

import { dispatch } from '@gecut/signal';
import IconAddRounded from 'virtual:icons/material-symbols/add-rounded';
import IconCallOutlineRounded from 'virtual:icons/material-symbols/call-outline-rounded';
import IconDescriptionOutlineRounded from 'virtual:icons/material-symbols/description-outline-rounded';
import IconEditOutlineRounded from 'virtual:icons/material-symbols/edit-outline-rounded';
import IconLocationOnOutlineRounded from 'virtual:icons/material-symbols/location-on-outline-rounded';
import IconPersonOutlineRounded from 'virtual:icons/material-symbols/person-outline-rounded';
import IconShoppingCardOutlineRounded from 'virtual:icons/material-symbols/shopping-cart-outline-rounded';

import { customerAddProjectDialog } from './customer-add-project-dialog';

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
        customConfig: (target) => {
          target.style.marginTop = 'var(--sys-spacing-track,8px)';
          target.style.marginBottom = 'calc(2*var(--sys-spacing-track,8px))';

          return target;
        },
        slotList: [
          {
            component: 'list',
            type: 'dialog',
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
                    SVG: IconPersonOutlineRounded,
                  },
                ],
              },
              {
                component: 'list-item',
                type: 'list-item',
                headline: `${i18n.phoneNumber(customer.phoneNumber)}`,
                slotList: [
                  {
                    component: 'icon',
                    type: 'svg',
                    slot: 'start',
                    SVG: IconCallOutlineRounded,
                  },
                ],
              },
              {
                component: 'list-item',
                type: 'list-item',
                headline: [
                  i18n.numberFormat(customer.orderList.length),
                  i18n.message('customers_information_box_dialog_order'),
                ].join(' '),
                slotList: [
                  {
                    component: 'icon',
                    type: 'svg',
                    slot: 'start',
                    SVG: IconShoppingCardOutlineRounded,
                  },
                ],
              },
              {
                component: 'list-item',
                type: 'list-item',
                headline: i18n.message(
                  'customers_information_box_dialog_description'
                ),
                supportingText: customer.description,
                multiLineSupportingText: true,
                slotList: [
                  {
                    component: 'icon',
                    type: 'svg',
                    slot: 'start',
                    SVG: IconDescriptionOutlineRounded,
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
                    label: i18n.message(
                      'customers_information_box_dialog_edit_customer'
                    ),
                    slot: 'footer',
                    slotList: [
                      {
                        component: 'icon',
                        type: 'svg',
                        SVG: IconEditOutlineRounded,
                        slot: 'icon',
                      },
                    ],
                  },
                  {
                    component: 'button',
                    type: 'tonal',
                    label: i18n.message(
                      'customers_information_box_dialog_add_project'
                    ),
                    slot: 'footer',
                    slotList: [
                      {
                        component: 'icon',
                        type: 'svg',
                        SVG: IconAddRounded,
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
                customConfig: (target) => {
                  target.style.display = 'flex';
                  target.style.flexDirection = 'column';
                  target.style.gap = 'calc(1.5 * var(--sys-spacing-track))';
                  target.style.padding = 'calc(1.5 * var(--sys-spacing-track))';

                  return target;
                },
              },
              { component: 'divider', type: 'divider' },
              {
                component: 'division',
                type: 'span',
                customConfig: (target) => {
                  target.style.display = 'flex';
                  target.style.justifyContent = 'center';
                  target.style.paddingTop = 'var(--sys-spacing-track)';
                  target.style.fontSize =
                    'var(--md-sys-typescale-body-small-font-size)';
                  target.style.fontWeight =
                    'var(--md-sys-typescale-body-small-font-weight)';
                  target.style.color = 'var(--md-sys-color-on-surface-variant)';
                  target.innerHTML = [
                    i18n.message('customers_information_box_dialog_created_by'),
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
        slotList: [
          {
            component: 'list',
            type: 'dialog',
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
                  SVG: IconLocationOnOutlineRounded,
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
        label: i18n.message('customers_information_box_dialog_close_label'),
        slot: 'footer',
        customConfig: (target) => {
          target.setAttribute('dialogAction', 'close');

          return target;
        },
      },
    ],
  };
}
