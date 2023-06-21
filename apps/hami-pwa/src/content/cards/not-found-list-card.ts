import icons from '#hami/ui/icons';

import i18n from '@gecut/i18n';

import type { M3 } from '@gecut/ui-kit';

export function notFoundListCard(
  text = i18n.msg('nothing-found')
): M3.Types.SurfaceCardContent {
  return {
    component: 'surface-card',
    type: 'elevated',
    styles: {
      'align-items': 'center',
      padding: 'var(--sys-spacing-track) 0',
    },
    slotList: [
      {
        component: 'icon',
        type: 'svg',
        SVG: icons.outlineRounded.warning,
        styles: {
          'margin-top': 'var(--sys-spacing-track)',
          color: 'var(--md-sys-color-tertiary)',
          'font-size': 'min(12vw, 38px)',
        },
      },
      {
        component: 'typography',
        type: 'p',
        slotList: [text],
        styles: {
          color: 'var(--md-sys-color-tertiary)',
        },
        style: 'body-medium',
      },
    ],
  };
}
