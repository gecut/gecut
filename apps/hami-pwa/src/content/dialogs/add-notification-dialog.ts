import { validators } from '#hami/controllers/default-validators';
import icons from '#hami/ui/icons';

import i18n from '@gecut/i18n';
import { dispatch, request } from '@gecut/signal';

import { notificationStatusSelect } from '../selects/notification-status-select';
import { headingPageTypography } from '../typographies/heading-page-typography';

import type { Projects } from '@gecut/types';
import type { M3 } from '@gecut/ui-kit';

export function addNotificationDialog(
  notification?: Projects.Hami.Notification
): M3.Types.DialogContent {
  const isEdit = notification != null;
  const title = isEdit
    ? i18n.msg('edit-notification')
    : i18n.msg('add-notification');

  return {
    component: 'dialog',
    type: 'dialog',
    fullscreen: true,
    slotList: [
      headingPageTypography(title, {
        slot: 'headline',
      }),
      {
        component: 'surface-card',
        type: 'elevated',
        styles: {
          position: 'relative',
          'margin-top': 'calc(.2*var(--sys-spacing-track,8px))',
          'margin-bottom': 'var(--sys-spacing-track,8px)',
          padding:
            'var(--sys-spacing-track,8px) calc(2*var(--sys-spacing-track,8px)) calc(2*var(--sys-spacing-track,8px))',
        },
        slotList: [
          {
            component: 'form-builder',
            type: 'form-builder',
            styles: {
              'margin-top': '8px',
            },
            styleVars: {
              '--padding-side': '0',
            },
            data: {
              slides: {
                notification: [
                  {
                    component: 'text-field',
                    type: 'filled',
                    inputType: 'text',
                    name: 'message',
                    label: i18n.msg('message'),
                    validator: validators('required'),
                    value: notification?.message,
                  },
                  notificationStatusSelect(notification?.status),
                  {
                    component: 'button',
                    type: 'filled',
                    disabled: 'auto',
                    action: 'form_submit',
                    label: title,
                  },
                ],
              },
              onSubmit: async (event) => {
                if (event.validate === true && event.values != null) {
                  const _notification = event.values[
                    'notification'
                  ] as unknown as Projects.Hami.Notification;

                  if (_notification != null) {
                    if (notification?.id != null) {
                      _notification.id = notification.id;
                    }

                    await request('patch-notification-storage', {
                      data: [_notification],
                    });
                    request('notification-storage', {});
                    dispatch('dialog', null);
                    dispatch('snack-bar', {
                      component: 'snack-bar',
                      type: 'ellipsis-message',
                      message: i18n.msg('notification-successfully-registered'),
                      align: 'bottom',
                      duration: 2_000,
                      closeButton: true,
                    });
                  }
                }
              },
            },
            activeSlide: 'notification',
          },
        ],
      },
      {
        component: 'button',
        type: 'text',
        hasIcon: true,
        label: i18n.msg('delete'),
        disabled: !(isEdit === true),
        slot: 'footer',
        slotList: [
          {
            component: 'icon',
            type: 'svg',
            slot: 'icon',
            SVG: icons.outlineRounded.delete,
          },
        ],
        customConfig: (target) => {
          target.addEventListener('click', async () => {
            if (notification == null) return;

            notification.active = false;

            target.disabled = true;
            await request('patch-notification-storage', {
              data: [notification],
            });
            target.disabled = false;

            request('notification-storage', {});
            dispatch('dialog', null);
            dispatch('snack-bar', {
              component: 'snack-bar',
              type: 'ellipsis-message',
              message: i18n.msg('notification-successfully-deleted'),
              align: 'bottom',
              duration: 2_000,
              closeButton: true,
            });
          });

          return target;
        },
      },
      {
        component: 'button',
        type: 'text',
        label: i18n.msg('close'),
        slot: 'footer',
        customConfig: (target) => {
          target.setAttribute('dialogAction', 'close');

          return target;
        },
      },
    ],
  };
}
