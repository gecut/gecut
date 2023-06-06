import '#hami/ui/pages/customers/customers.page';
import '#hami/ui/pages/home/home.page';
import '#hami/ui/pages/landing/landing.page';
import '#hami/ui/pages/orders/orders.page';
import '#hami/ui/pages/sign-in/sign-in.page';
import '#hami/ui/pages/user/user.page';

import type { Route } from '@vaadin/router';

export const routes: Route[] = [
  { path: '/', name: 'Landing', component: 'page-landing' },
  { path: '/home', name: 'Home', component: 'page-home' },
  { path: '/customers', name: 'Customers', component: 'page-customers' },
  { path: '/orders', name: 'Orders', component: 'page-orders' },
  {
    path: '/user',
    component: 'page-user',
    name: 'User',
  },
  { path: '/user/sign-in', name: 'SignIn', component: 'page-sign-in' },
];
