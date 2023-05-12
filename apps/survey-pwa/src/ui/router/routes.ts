import type { Route } from '@vaadin/router';

import '../pages/survey/survey.page';

export const routes: Route[] = [
  { path: '/survey', name: 'Survey', component: 'page-survey' },
  { path: '(.*)', redirect: '/survey' },
];
