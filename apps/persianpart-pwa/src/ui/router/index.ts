import { createLogger } from '@gecut/logger';
import { gecutCancelIdleCallback, gecutIdleCallback } from '@gecut/utilities';
import { Router } from '@vaadin/router';

import { routes } from './routes';

import type { Params } from '@vaadin/router';

const logger = createLogger('[router]');
const router = new Router();

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
  const _return = router.urlForName(name, params);

  logger.methodFull?.('urlForName', { name, params }, _return);

  return _return;
};

let lastRouterGo: number | null = null;

export const routerGo = (path: string) => {
  logger.methodArgs?.('routerGo', { path });

  if (lastRouterGo != null) {
    gecutCancelIdleCallback(lastRouterGo);
  }

  lastRouterGo = gecutIdleCallback(() => router.render(path, true));

  return path;
};
