import { ifAdmin } from '#hami/controllers/if-admin';

import i18n from '@gecut/i18n';
import { dispatch } from '@gecut/signal';
import { M3 } from '@gecut/ui-kit';
import { flow } from '@lit-labs/virtualizer/layouts/flow.js';
import { html } from 'lit';

import { addProductPriceDialog } from '../dialogs/add-product-price-dialog';

import { notFoundListCard } from './not-found-list-card';

import type { Projects } from '@gecut/types';
import type { Lit } from '@gecut/ui-kit';

export function productPriceItem(
  productPrice: Projects.Hami.ProductPrice
): M3.Types.ItemRendererReturn {
  return M3.Renderers.renderListItem({
    component: 'list-item',
    type: 'list-item',
    attributes: {
      headline: productPrice.name,
      supportingText: i18n.int(productPrice.minPrice),
      trailingSupportingText: i18n.int(productPrice.normalPrice),
      classes: ['notification-item'],
      styles: {
        '--_list-item-supporting-text-color': 'var(--md-sys-color-primary)',
      },
    },
    transformers: (target) => {
      ifAdmin(() => {
        target.addEventListener('click', () => {
          dispatch('dialog', addProductPriceDialog(productPrice));
        });
      });

      return target;
    },
  });
}

export function productPriceList(
  productPrices: Projects.Hami.ProductPrice[]
): Lit.Types.LitVirtualizerContent<Projects.Hami.ProductPrice> {
  return {
    component: 'lit-virtualizer',
    type: 'lit-virtualizer',

    attributes: {
      scroller: true,
      items: productPrices,
      layout: flow({
        direction: 'vertical',
      }),
      renderItem: (productPrice) => {
        return html`${productPriceItem(productPrice)}`;
      },
    },
  };
}

export function productPriceListCard(
  productPrices: Projects.Hami.ProductPrice[],
  query = ''
): M3.Types.SurfaceCardRendererReturn {
  productPrices = productPrices.filter(
    (notification) => notification.active === true
  );

  if (productPrices.length === 0) {
    return M3.Renderers.renderSurfaceCard(
      notFoundListCard(i18n.msg('product-price-not-found'))
    );
  }

  productPrices = productPrices
    .sort((a, b) => {
      return (a.meta?.updated ?? 0) - (b.meta?.updated ?? 0);
    })
    .reverse();

  if (query.trim() !== '') {
    productPrices = productPrices.filter((productPrice) =>
      productPrice.name.includes(query)
    );
  }

  return M3.Renderers.renderSurfaceCard({
    component: 'surface-card',
    type: 'elevated',
    children: [
      productPriceList(
        productPrices
      ) as Lit.Types.LitVirtualizerContent<unknown>,
    ],
  });
}
