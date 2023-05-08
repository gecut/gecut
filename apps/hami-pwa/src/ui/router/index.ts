import { Router } from '@vaadin/router';

import { routes } from './routes';

import type { Params } from '@vaadin/router';

export const router = new Router();

router.setRoutes([
  // Redirect to URL without trailing slash
  {
    path: '(.*)/',
    action: (context, commands) => {
      const newPath = context.pathname.slice(0, -1);
      return commands.redirect(newPath);
    },
  },
  ...routes,
]);

export const attachRouter = (outlet: HTMLElement) => {
  router.setOutlet(outlet);
};

export const urlForName = (name: string, params?: Params) => {
  return router.urlForName(name, params);
};
