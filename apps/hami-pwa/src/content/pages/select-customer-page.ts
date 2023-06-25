import type { NewOrder } from '#hami/config';
import icons from '#hami/ui/icons';

import i18n from '@gecut/i18n';
import { dispatch } from '@gecut/signal';
import { M3 } from '@gecut/ui-kit';
import { gecutAnimationFrame } from '@gecut/utilities';
import { flow } from '@lit-labs/virtualizer/layouts/flow.js';
import { html } from 'lit';

import { notFoundListCard } from '../cards/not-found-list-card';
import { headingPageTypography } from '../typographies/heading-page-typography';

import type { Projects, RenderResult } from '@gecut/types';
import type { Lit } from '@gecut/ui-kit';

function customerItem(
  customer: Projects.Hami.CustomerModel,
  order: Partial<NewOrder>
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
      {
        component: 'radio',
        type: 'radio',
        slot: 'end',
        value: customer.id,
        checked: customer.id === order.customerId,
      },
    ],
    customConfig: (target) => {
      target.addEventListener('click', () => {
        const radio = target.querySelector('md-radio');
        if (radio != null) {
          radio.checked = true;

          gecutAnimationFrame(() => {
            dispatch('new-order', {
              customerId: radio.value,
            });
          });
        }
      });

      return target;
    },
  });
}

function customerList(
  customers: Projects.Hami.CustomerModel[],
  order: Partial<NewOrder>
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
      return html`${customerItem(customers, order)}`;
    },
  };
}

function customersListCard(
  customers: Projects.Hami.CustomerModel[],
  order: Partial<NewOrder>,
  query = ''
): M3.Types.SurfaceCardRendererReturn {
  customers = customers.filter((customer) => customer.active === true);

  if (query.trim() !== '') {
    customers = customers.filter((customer) =>
      String(
        customer?.firstName ??
          '' + customer?.lastName ??
          '' + customer.phoneNumber
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
      customerList(
        customers,
        order
      ) as Lit.Types.LitVirtualizerContent<unknown>,
    ],
  });
}

export function selectCustomerPage(
  customers: Projects.Hami.CustomerModel[],
  order: Partial<NewOrder>
): RenderResult {
  const headline = M3.Renderers.renderTypoGraphy(
    headingPageTypography(i18n.msg('select-customer'))
  );

  return html`${headline}${customersListCard(customers, order)}`;
}
