import type { NewOrder } from '#hami/config';
import icons from '#hami/ui/icons';

import i18n from '@gecut/i18n';
import { dispatch } from '@gecut/signal';
import { M3 } from '@gecut/ui-kit';
import { flow } from '@lit-labs/virtualizer/layouts/flow.js';
import { html } from 'lit';

import { notFoundListCard } from '../cards/not-found-list-card';
import { headingPageTypography } from '../typographies/heading-page-typography';

import type { Projects, RenderResult } from '@gecut/types';
import type { Lit } from '@gecut/ui-kit';

function productItem(
  product: Projects.Hami.Product,
  order: Partial<NewOrder>
): M3.Types.ItemRendererReturn {
  const checked = (order.productList ?? [])
    .map((_product) => _product?.productId === product.id)
    .reduce((p, c) => p || c, false);

  return M3.Renderers.renderListItem({
    component: 'list-item',
    type: 'list-item',
    attributes: {
      headline: product.code + ' - ' + product.name,
      supportingText: product.brand + ' - ' + product.category,
      multiLineSupportingText: true,
      trailingSupportingText: product.unit,
      classes: ['product-item'],
    },
    children: [
      {
        component: 'icon',
        type: 'svg',
        attributes: { slot: 'start' },
        SVG: icons.outlineRounded.category,
      },
      {
        component: 'checkbox',
        type: 'checkbox',
        attributes: { slot: 'end', value: product.id, checked },
      },
    ],
    transformers: (target) => {
      target.addEventListener('click', () => {
        const checkbox = target.querySelector('md-checkbox');
        if (checkbox != null) {
          let productList = order.productList ?? [];

          const isExists = productList
            .map((product) => {
              console.log(product);

              return product?.productId == checkbox.value;
            })
            .reduce((p, c) => p || c, false);

          if (isExists) {
            productList = productList.filter(
              (product) => product?.productId !== checkbox.value
            );
          } else {
            productList.push({
              discount: 0,
              unit: product.unit,
              productId: checkbox.value,
            });
          }

          checkbox.checked = !isExists;
          order.productList = productList;

          dispatch('new-order', {
            productList,
          });
        }
      });

      return target;
    },
  });
}

function productList(
  products: Projects.Hami.Product[],
  order: Partial<NewOrder>
): Lit.Types.LitVirtualizerContent<Projects.Hami.Product> {
  return {
    component: 'lit-virtualizer',
    type: 'lit-virtualizer',

    attributes: {
      // scroller: true,
      items: products,
      layout: flow({
        direction: 'vertical',
      }),
      renderItem: (products) => {
        return html`${productItem(products, order)}`;
      },
    },
  };
}

function productsListCard(
  products: Projects.Hami.Product[],
  order: Partial<NewOrder>,
  query = ''
): M3.Types.SurfaceCardRendererReturn {
  products = products.filter((product) => product.active === true);

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
    children: [
      productList(products, order) as Lit.Types.LitVirtualizerContent<unknown>,
    ],
  });
}

export function selectProductsPage(
  products: Projects.Hami.Product[],
  order: Partial<NewOrder>
): RenderResult {
  const headline = M3.Renderers.renderTypoGraphy(
    headingPageTypography(i18n.msg('select-product'))
  );

  return html`${headline}${productsListCard(products, order)}`;
}
