import i18n from '#hami/ui/i18n';
import icons from '#hami/ui/icons';

import type { Projects } from '@gecut/types';
import type { M3 } from '@gecut/ui-kit';

export function customerProjectItem(
  project: Projects.Hami.CustomerProjectModel
): M3.Types.ListItemContent {
  return {
    component: 'list-item',
    type: 'list-item',
    headline: project.projectName,
    supportingText: project.projectAddress,
    trailingSupportingText: i18n.message(
      'customers_information_box_item_order',
      i18n.numberFormat(project.ordersCount ?? 0)
    ),
    styles: {
      width: '100%',
    },
    classes: ['project-item'],
    slotList: [
      {
        component: 'icon',
        type: 'svg',
        slot: 'start',
        SVG: icons.filled.corporateFare,
      },
    ],
  };
}

export function customerProjectList(
  projects: Projects.Hami.CustomerProjectModel[]
): M3.Types.ListContent {
  return {
    component: 'list',
    type: 'list',
    styles: {
      borderRadius: '12px',
      overflow: 'hidden',
    },
    slotList: projects.map((project) => customerProjectItem(project)),
  };
}

export function customerProjectListCard(
  projects: Projects.Hami.CustomerProjectModel[]
): M3.Types.SurfaceCardContent {
  return {
    component: 'surface-card',
    type: 'elevated',
    styles: { marginBottom: 'calc(2*var(--sys-spacing-track,8px))' },
    slotList: [customerProjectList(projects)],
  };
}
