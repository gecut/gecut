import { ifAdmin } from '#hami/controllers/if-admin';
import icons from '#hami/ui/icons';

import { dispatch } from '@gecut/signal';
import { M3 } from '@gecut/ui-kit';

import { addProductDialog } from '../dialogs/add-product-dialog';

import { notFoundListCard } from './not-found-list-card';

import type { Projects } from '@gecut/types';

export function productItem(
    product: Projects.Hami.Product
): M3.Types.ListItemContent {
  return {
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
    ],
    transformers: (target) => {
      ifAdmin(() => {
        target.addEventListener('click', () => {
          dispatch('dialog', addProductDialog(product));
        });
      });

      return target;
    },
  };
}

export function productsListCard(
    products: Projects.Hami.Product[],
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
    children: products.map((product) => productItem(product)),
  });
}
