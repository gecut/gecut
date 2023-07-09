import '#persianpart/ui/pages/home/home.page';

import type { Route } from '@vaadin/router';

export const routes: Route[] = [
  {
    path: '/home',
    name: 'Home',
    component: 'page-home',
  },
];
