import icons from '#hami/ui/icons';

import i18n from '@gecut/i18n';
import { dispatch } from '@gecut/signal';
import { M3 } from '@gecut/ui-kit';
import { sanitizer } from '@gecut/utilities';
import { flow } from '@lit-labs/virtualizer/layouts/flow.js';
import { html } from 'lit';

import { customerDialog } from '../dialogs/customer-dialog';

import { notFoundListCard } from './not-found-list-card';

import type { Projects } from '@gecut/types';
import type { Lit } from '@gecut/ui-kit';

export function customerItem(
  customer: Projects.Hami.CustomerModel
): M3.Types.ItemRendererReturn {
  return M3.Renderers.renderListItem({
    component: 'list-item',
    type: 'list-item',
    headline: customer.firstName + ' ' + customer.lastName,
    supportingText: customer.description,
    multiLineSupportingText: true,
    trailingSupportingText: i18n.msg(
      'number-of-order',
      i18n.int(customer.orderList.length)
    ),
    classes: ['notification-item'],
    styleVars: {
      '--_list-item-trailing-supporting-text-color':
        'var(--md-sys-color-primary)',
    },
    slotList: [
      {
        component: 'icon',
        type: 'svg',
        slot: 'start',
        SVG: icons.outlineRounded.person,
      },
    ],
    customConfig: (target) => {
      target.addEventListener('click', () => {
        dispatch('dialog', customerDialog(customer));
      });

      return target;
    },
  });
}

export function customerList(
  customers: Projects.Hami.CustomerModel[]
): Lit.Types.LitVirtualizerContent<Projects.Hami.CustomerModel> {
  return {
    component: 'lit-virtualizer',
    type: 'lit-virtualizer',

    // scroller: true,
    items: customers,
    layout: flow({
      direction: 'vertical',
    }),
    renderItem: (customers) => {
      return html`${customerItem(customers)}`;
    },
  };
}

export function customersListCard(
  customers: Projects.Hami.CustomerModel[],
  query = ''
): M3.Types.SurfaceCardRendererReturn {
  customers = customers.filter((customer) => customer.active === true);

  if (query.trim() !== '') {
    customers = customers.filter((customer) =>
      String(
        sanitizer.str(customer.firstName) + sanitizer.str(customer.lastName) + customer.phoneNumber
      ).includes(query)
    );
  }

  if (customers.length === 0) {
    return M3.Renderers.renderSurfaceCard(notFoundListCard());
  }

  return M3.Renderers.renderSurfaceCard({
    component: 'surface-card',
    type: 'elevated',
    slotList: [
      customerList(customers) as Lit.Types.LitVirtualizerContent<unknown>,
    ],
  });
}
