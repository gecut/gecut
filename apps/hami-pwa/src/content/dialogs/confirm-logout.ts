import icons from '#hami/ui/icons';
import { routerGo, urlForName } from '#hami/ui/router';

import i18n from '@gecut/i18n';
import { dispatch } from '@gecut/signal';

import type { M3 } from '@gecut/ui-kit';

export function confirmLogoutDialog(): M3.Types.DialogContent {
  return {
    component: 'dialog',
    type: 'dialog',
    children: [
      {
        component: 'icon',
        type: 'svg',
        SVG: icons.filledRounded.logout,
        attributes: { slot: 'headline-prefix' },
      },
      {
        component: 'typography',
        type: 'h2',
        style: 'headline-small',
        attributes: { slot: 'headline' },
        children: [i18n.msg('are-you-sure')],
      },
      {
        component: 'typography',
        type: 'p',
        style: 'body-medium',
        attributes: { slot: 'headline-suffix' },
        children: [
          i18n.msg(
            'after-exiting-the-tokens-will-be-deleted-so-you-have-to-enter-again'
          ),
        ],
      },
      {
        component: 'button',
        type: 'text',
        children: [i18n.msg('sign-out')],
        attributes: { slot: 'footer' },
        transformers: (target) => {
          target.addEventListener('click', () => {
            localStorage.removeItem('USER_ID');
            localStorage.removeItem('USER_TOKEN');
            routerGo(urlForName('Landing'));
            dispatch('dialog', null);
          });

          return target;
        },
      },
      {
        component: 'button',
        type: 'text',
        children: [i18n.msg('cancel')],
        attributes: { slot: 'footer' },
        events: {
          click: () => {
            dispatch('dialog', null);
          },
        },
      },
    ],
  };
}
