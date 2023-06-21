import icons from '#hami/ui/icons';

import i18n from '@gecut/i18n';

import { notFoundListCard } from './not-found-list-card';

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
    trailingSupportingText: i18n.msg(
      'number-of-order',
      i18n.int(project.ordersCount ?? 0)
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
      'border-radius': '12px',
      overflow: 'hidden',
    },
    slotList: projects.map((project) => customerProjectItem(project)),
  };
}

export function customerProjectListCard(
  projects: Projects.Hami.CustomerProjectModel[]
): M3.Types.SurfaceCardContent {
  if (projects.length === 0) {
    return notFoundListCard(i18n.msg('project-not-found'));
  }

  return {
    component: 'surface-card',
    type: 'elevated',
    styles: { 'margin-bottom': 'calc(2*var(--sys-spacing-track,8px))' },
    slotList: [customerProjectList(projects)],
  };
}
