import '#hami/ui/pages/home/home.page';
import '#hami/ui/pages/landing/landing.page';
import '#hami/ui/pages/sign-in/sign-in.page';

import type { Route } from '@vaadin/router';

export const routes: Route[] = [
  { path: '/', name: 'Landing', component: 'page-landing' },
  {
    path: '/home',
    name: 'Home',
    component: 'page-home',
  },
  {
    path: '/customers',
    name: 'Customers',
    component: 'page-customers',
    action: async () => {
      await import('#hami/ui/pages/customers/customers.page');
    },
  },
  {
    path: '/orders',
    name: 'Orders',
    component: 'page-orders',
    action: async () => {
      await import('#hami/ui/pages/orders/orders.page');
    },
  },
  {
    path: '/orders/new',
    name: 'NewOrder',
    component: 'page-new-order',
    action: async () => {
      await import('#hami/ui/pages/new-order/new-order.page');
    },
  },
  {
    path: '/products',
    component: 'page-products',
    name: 'Products',
    action: async () => {
      await import('#hami/ui/pages/products/products.page');
    },
  },
  {
    path: '/suppliers',
    component: 'page-suppliers',
    name: 'Suppliers',
    action: async () => {
      await import('#hami/ui/pages/suppliers/suppliers.page');
    },
  },
  {
    path: '/user/sign-in',
    name: 'SignIn',
    component: 'page-sign-in',
  },
];
