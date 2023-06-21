import { ifAdmin } from '#hami/controllers/if-admin';
import icons from '#hami/ui/icons';

import i18n from '@gecut/i18n';
import { dispatch } from '@gecut/signal';
import { M3 } from '@gecut/ui-kit';
import { flow } from '@lit-labs/virtualizer/layouts/flow.js';
import { html } from 'lit';

import { supplierDialog } from '../dialogs/supplier-dialog';

import { notFoundListCard } from './not-found-list-card';

import type { Projects } from '@gecut/types';
import type { Lit } from '@gecut/ui-kit';

export function supplierItem(
  supplier: Projects.Hami.SupplierModel
): M3.Types.ItemRendererReturn {
  return M3.Renderers.renderListItem({
    component: 'list-item',
    type: 'list-item',
    headline: supplier.firstName + ' ' + supplier.lastName,
    supportingText: supplier.description,
    multiLineSupportingText: true,
    trailingSupportingText: i18n.msg(
      'number-of-order',
      i18n.int(supplier.orderList.length)
    ),
    classes: ['supplier-item'],
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
      ifAdmin(
        () => {
          target.addEventListener('click', () => {
            dispatch('dialog', supplierDialog(supplier, true));
          });
        },
        () => {
          target.addEventListener('click', () => {
            dispatch('dialog', supplierDialog(supplier, false));
          });
        }
      );

      return target;
    },
  });
}

export function supplierList(
  suppliers: Projects.Hami.SupplierModel[]
): Lit.Types.LitVirtualizerContent<Projects.Hami.SupplierModel> {
  return {
    component: 'lit-virtualizer',
    type: 'lit-virtualizer',

    // scroller: true,
    items: suppliers,
    layout: flow({
      direction: 'vertical',
    }),
    renderItem: (suppliers) => {
      return html`${supplierItem(suppliers)}`;
    },
  };
}

export function suppliersListCard(
  suppliers: Projects.Hami.SupplierModel[],
  query = ''
): M3.Types.SurfaceCardRendererReturn {
  if (query.trim() !== '') {
    suppliers = suppliers.filter((supplier) =>
      String(
        supplier.firstName + supplier.lastName + supplier.phoneNumber
      ).includes(query)
    );
  }

  if (suppliers.length === 0) {
    return M3.Renderers.renderSurfaceCard(notFoundListCard());
  }

  return M3.Renderers.renderSurfaceCard({
    component: 'surface-card',
    type: 'elevated',
    slotList: [
      supplierList(suppliers) as Lit.Types.LitVirtualizerContent<unknown>,
    ],
  });
}
