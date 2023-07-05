import { ifAdmin } from '#hami/controllers/if-admin';
import icons from '#hami/ui/icons';

import i18n from '@gecut/i18n';
import { dispatch } from '@gecut/signal';
import { M3 } from '@gecut/ui-kit';
import { flow } from '@lit-labs/virtualizer/layouts/flow.js';
import { html } from 'lit';

import { addNotificationDialog } from '../dialogs/add-notification-dialog';
import { logger } from '../logger';

import { notFoundListCard } from './not-found-list-card';

import type { Projects } from '@gecut/types';
import type { Lit } from '@gecut/ui-kit';

export function notificationItemIcon(
  status: Projects.Hami.Notification['status']
): M3.Types.IconContent {
  logger.methodArgs?.('notificationItemIcon', { status });

  // * normal
  let icon = icons.outlineRounded.star;
  let cssColorVariable = 'var(--md-sys-color-gold)';

  switch (status) {
  case 'danger':
    icon = icons.outlineRounded.error;
    cssColorVariable = 'var(--md-sys-color-danger)';
    break;
  case 'warning':
    icon = icons.outlineRounded.warning;
    cssColorVariable = 'var(--md-sys-color-warning)';
    break;
  case 'success':
    icon = icons.filledRounded.done;
    cssColorVariable = 'var(--md-sys-color-success)';
    break;
  }

  return {
    component: 'icon',
    type: 'svg',
    attributes: { slot: 'start', styles: { color: cssColorVariable } },
    SVG: icon,
  };
}

export function notificationItem(
  notification: Projects.Hami.Notification
): M3.Types.ItemRendererReturn {
  logger.methodArgs?.('notificationItem', { notification });

  return M3.Renderers.renderListItem({
    component: 'list-item',
    type: 'list-item',
    attributes: {
      supportingText: notification.message,
      multiLineSupportingText: true,
      classes: ['notification-item'],
    },
    children: [notificationItemIcon(notification.status)],
    transformers: (target) => {
      ifAdmin(() => {
        target.addEventListener('click', () => {
          dispatch('dialog', addNotificationDialog(notification));
        });
      });

      return target;
    },
  });
}

export function notificationList(
  notifications: Projects.Hami.Notification[]
): Lit.Types.LitVirtualizerContent<Projects.Hami.Notification> {
  logger.methodArgs?.('notificationList', { notifications });

  return {
    component: 'lit-virtualizer',
    type: 'lit-virtualizer',

    attributes: {
      scroller: true,
      items: notifications,
      layout: flow({
        direction: 'vertical',
      }),
      renderItem: (notification) => {
        return html`${notificationItem(notification)}`;
      },
    },
  };
}

export function notificationListCard(
  notifications: Projects.Hami.Notification[]
): M3.Types.SurfaceCardRendererReturn {
  logger.methodArgs?.('notificationListCard', { notifications });

  notifications = notifications.filter(
    (notification) => notification.active === true
  );

  if (notifications.length === 0) {
    return M3.Renderers.renderSurfaceCard(
      notFoundListCard(i18n.msg('notification-not-found'))
    );
  }

  notifications = notifications
    .sort((a, b) => {
      return (a.meta?.updated ?? 0) - (b.meta?.updated ?? 0);
    })
    .reverse()
    .sort((a, b) => {
      return statusPriority[a.status] - statusPriority[b.status];
    });

  return M3.Renderers.renderSurfaceCard({
    component: 'surface-card',
    type: 'elevated',
    children: [
      notificationList(
        notifications
      ) as Lit.Types.LitVirtualizerContent<unknown>,
    ],
  });
}

const statusPriority = {
  danger: 0,
  warning: 1_00,
  success: 10_00,
  normal: 100_00,
};
