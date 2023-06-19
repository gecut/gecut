import i18n from '@gecut/i18n';
import { M3 } from '@gecut/ui-kit';
import { flow } from '@lit-labs/virtualizer/layouts/flow.js';
import { html } from 'lit';

import { notFoundListCard } from './not-found-list-card';

import type { Projects } from '@gecut/types';
import type { Lit } from '@gecut/ui-kit';

export function productPriceItem(
  productPrice: Projects.Hami.ProductPrice
): M3.Types.ItemRendererReturn {
  return M3.Renderers.renderListItem({
    component: 'list-item',
    type: 'list-item',
    headline: productPrice.name,
    supportingText: i18n.int(productPrice.minPrice),
    trailingSupportingText: i18n.int(productPrice.normalPrice),
    classes: ['notification-item'],
    styleVars: {
      '--_list-item-supporting-text-color': 'var(--md-sys-color-primary)',
    },
  });
}

export function productPriceList(
  productPrices: Projects.Hami.ProductPrice[]
): Lit.Types.LitVirtualizerContent<Projects.Hami.ProductPrice> {
  return {
    component: 'lit-virtualizer',
    type: 'lit-virtualizer',

    scroller: true,
    items: productPrices,
    layout: flow({
      direction: 'vertical',
    }),
    renderItem: (productPrice) => {
      return html`${productPriceItem(productPrice)}`;
    },
  };
}

export function productPriceListCard(
  productPrices: Projects.Hami.ProductPrice[],
  query = ''
): M3.Types.SurfaceCardRendererReturn {
  if (query.trim() !== '') {
    productPrices = productPrices.filter((productPrice) =>
      productPrice.name.includes(query)
    );
  }

  if (productPrices.length === 0) {
    return M3.Renderers.renderSurfaceCard(notFoundListCard());
  }

  return M3.Renderers.renderSurfaceCard({
    component: 'surface-card',
    type: 'elevated',
    slotList: [
      productPriceList(
        productPrices
      ) as Lit.Types.LitVirtualizerContent<unknown>,
    ],
  });
}
