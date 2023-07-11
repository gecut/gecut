import '#persianpart/ui/pages/home/home.page';
import '#persianpart/ui/pages/products/products.page';

import type { Route } from '@vaadin/router';

export const routes: Route[] = [
  {
    path: '/',
    name: 'home',
    component: 'page-home',
  },
  {
    path: '/products',
    name: 'products',
    component: 'page-products',
  },
];
