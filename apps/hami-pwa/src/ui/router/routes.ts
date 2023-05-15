import '../pages/home/home.page';
import '../pages/landing/landing.page';
import '../pages/sign-in/sign-in.page';
import '../pages/user/user.page';

import type { Route } from '@vaadin/router';

export const routes: Route[] = [
  { path: '/', name: 'Landing', component: 'page-landing' },
  { path: '/home', name: 'Home', component: 'page-home' },
  {
    path: '/user',
    component: 'page-user',
    name: 'User',
  },
  { path: '/user/sign-in', name: 'SignIn', component: 'page-sign-in' },
];
