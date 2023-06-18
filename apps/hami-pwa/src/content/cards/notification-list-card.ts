import icons from '#hami/ui/icons';

import { M3 } from '@gecut/ui-kit';
import { flow } from '@lit-labs/virtualizer/layouts/flow.js';
import { html } from 'lit';

import type { Projects } from '@gecut/types';
import type { Lit } from '@gecut/ui-kit';

export function notificationItemIcon(
  status: Projects.Hami.Notification['status']
): M3.Types.IconContent {
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
    slot: 'start',
    SVG: icon,
    styles: { color: cssColorVariable },
  };
}

export function notificationItem(
  notification: Projects.Hami.Notification
): M3.Types.ItemRendererReturn {
  return M3.Renderers.renderListItem({
    component: 'list-item',
    type: 'list-item',
    supportingText: notification.message,
    multiLineSupportingText: true,
    classes: ['notification-item'],
    slotList: [notificationItemIcon(notification.status)],
  });
}

export function notificationList(
  notifications: Projects.Hami.Notification[]
): Lit.Types.LitVirtualizerContent<Projects.Hami.Notification> {
  return {
    component: 'lit-virtualizer',
    type: 'lit-virtualizer',

    scroller: true,
    items: notifications,
    layout: flow({
      direction: 'vertical',
    }),
    renderItem: (notification) => {
      return html`${notificationItem(notification)}`;
    },
  };
}

export function notificationListCard(
  notifications: Projects.Hami.Notification[]
): M3.Types.SurfaceCardRendererReturn {
  return M3.Renderers.renderSurfaceCard({
    component: 'surface-card',
    type: 'elevated',
    slotList: [
      notificationList(
        notifications
      ) as Lit.Types.LitVirtualizerContent<unknown>,
    ],
  });
}
