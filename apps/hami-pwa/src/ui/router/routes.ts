import type { Route } from '@vaadin/router';

import '../pages/home/home.page';
import '../pages/sign-in/sign-in.page';
import '../pages/landing/landing.page';

export const routes: Route[] = [
  { path: '/', component: 'page-landing' },
  { path: '/home', component: 'page-home' },
  { path: '/sign-in', component: 'page-sign-in' },
];
