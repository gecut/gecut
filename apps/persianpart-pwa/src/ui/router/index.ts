import { createLogger } from '@gecut/logger';
import {
  gecutCancelIdleCallback,
  gecutIdleCallback,
  untilNextFrame,
} from '@gecut/utilities';
import { Router } from '@vaadin/router';

import { routes } from './routes';

import type { Params } from '@vaadin/router';

const logger = createLogger('router');
const router = new Router();

export const attachRouter = (outlet: HTMLElement | null) => {
  if (outlet != null && outlet.role === 'main') {
    logger.methodArgs?.('attachRouter', {
      outlet,
      isNode: outlet instanceof Node,
    });

    router.setOutlet(outlet);
  }

  initRouter();
};

export const initRouter = async () => {
  await untilNextFrame();

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

  lastRouterGo = gecutIdleCallback(() => Router.go(path));

  return path;
};
