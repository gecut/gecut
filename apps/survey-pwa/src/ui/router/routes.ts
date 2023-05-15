import '../pages/survey/survey.page';

import type { Route } from '@vaadin/router';

export const routes: Route[] = [
  { path: '/survey', name: 'Survey', component: 'page-survey' },
  { path: '(.*)', redirect: '/survey' },
];
