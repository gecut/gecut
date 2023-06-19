import icons from '#hami/ui/icons';

import i18n from '@gecut/i18n';
import { M3 } from '@gecut/ui-kit';

export function notFoundListCard(): M3.Components.SurfaceCard {
  return M3.Renderers.renderSurfaceCard({
    component: 'surface-card',
    type: 'elevated',
    styles: {
      alignItems: 'center',
    },
    slotList: [
      {
        component: 'icon',
        type: 'svg',
        SVG: icons.outlineRounded.warning,
        styles: {
          marginTop: 'calc(1.5*var(--sys-spacing-track))',
          color: 'var(--md-sys-color-warning)',
          fontSize: 'min(14vw, 42px)',
        },
      },
      {
        component: 'typography',
        type: 'p',
        slotList: [i18n.msg('nothing-found')],
      },
    ],
  });
}
