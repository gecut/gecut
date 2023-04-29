import type { Route } from '@vaadin/router';

import '../pages/products/products';

export const routes: Route[] = [
  { path: '/', redirect: '/products' },
  {
    path: '/products',
    component: 'products-page',
    name: 'Products Page',
  },
];
