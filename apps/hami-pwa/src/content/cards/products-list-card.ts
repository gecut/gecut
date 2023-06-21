import { ifAdmin } from '#hami/controllers/if-admin';
import icons from '#hami/ui/icons';

import { dispatch } from '@gecut/signal';
import { M3 } from '@gecut/ui-kit';
import { flow } from '@lit-labs/virtualizer/layouts/flow.js';
import { html } from 'lit';

import { addProductDialog } from '../dialogs/add-product-dialog';

import { notFoundListCard } from './not-found-list-card';

import type { Projects } from '@gecut/types';
import type { Lit } from '@gecut/ui-kit';

export function productItem(
  product: Projects.Hami.Product
): M3.Types.ItemRendererReturn {
  return M3.Renderers.renderListItem({
    component: 'list-item',
    type: 'list-item',
    headline: product.code + ' - ' + product.name,
    supportingText: product.brand + ' - ' + product.category,
    multiLineSupportingText: true,
    trailingSupportingText: product.unit,
    classes: ['product-item'],
    slotList: [
      {
        component: 'icon',
        type: 'svg',
        slot: 'start',
        SVG: icons.outlineRounded.category,
      },
    ],
    customConfig: (target) => {
      ifAdmin(() => {
        target.addEventListener('click', () => {
          dispatch('dialog', addProductDialog(product));
        });
      });

      return target;
    },
  });
}

export function productList(
  products: Projects.Hami.Product[]
): Lit.Types.LitVirtualizerContent<Projects.Hami.Product> {
  return {
    component: 'lit-virtualizer',
    type: 'lit-virtualizer',

    // scroller: true,
    items: products,
    layout: flow({
      direction: 'vertical',
    }),
    renderItem: (products) => {
      return html`${productItem(products)}`;
    },
  };
}

export function productsListCard(
  products: Projects.Hami.Product[],
  query = ''
): M3.Types.SurfaceCardRendererReturn {
  if (query.trim() !== '') {
    products = products.filter((product) =>
      String(Object.values(product).join(' ')).includes(query)
    );
  }

  if (products.length === 0) {
    return M3.Renderers.renderSurfaceCard(notFoundListCard());
  }

  return M3.Renderers.renderSurfaceCard({
    component: 'surface-card',
    type: 'elevated',
    slotList: [
      productList(products) as Lit.Types.LitVirtualizerContent<unknown>,
    ],
  });
}
