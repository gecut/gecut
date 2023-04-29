import { html } from 'lit';

import type { NavigationTab, Product } from '@gecut/types';
import type { QueryParams } from './utils/query-params';

declare global {
  interface Signals {
    readonly products: Product[];
  }
  interface Providers {
    readonly products: QueryParams;
  }
}

const navigationTabs: NavigationTab[] = [
  {
    label: 'Products',
    link: '/products',
    icons: {
      active: html``,
      inActive: html``,
    },
  },
  {
    label: '404',
    link: '/404',
    icons: {
      active: html``,
      inActive: html``,
    },
  },
];

const config = {
  apiUrl: 'https://fakestoreapi.com',
  navigationTabs,
};

export default config;
