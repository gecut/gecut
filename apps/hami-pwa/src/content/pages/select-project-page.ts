import type { NewOrder } from '#hami/config';
import icons from '#hami/ui/icons';

import i18n from '@gecut/i18n';
import { dispatch } from '@gecut/signal';
import { M3 } from '@gecut/ui-kit';
import { flow } from '@lit-labs/virtualizer/layouts/flow.js';
import { html } from 'lit';

import { notFoundListCard } from '../cards/not-found-list-card';
import { headingPageTypography } from '../typographies/heading-page-typography';

import type { Projects, RenderResult } from '@gecut/types';
import type { Lit } from '@gecut/ui-kit';

function projectItem(
  project: Projects.Hami.CustomerProjectModel,
  order: Partial<NewOrder>
): M3.Types.ItemRendererReturn {
  return M3.Renderers.renderListItem({
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
      {
        component: 'radio',
        type: 'radio',
        slot: 'end',
        value: project.id,
        checked: project.id === order.customerProjectId,
      },
    ],
    customConfig: (target) => {
      target.addEventListener('click', () => {
        const radio = target.querySelector('md-radio');
        if (radio != null) {
          radio.checked = true;

          requestAnimationFrame(() => {
            dispatch('new-order', {
              customerProjectId: radio.value,
            });
          });
        }
      });

      return target;
    },
  });
}

function projectList(
  projects: Projects.Hami.CustomerProjectModel[],
  order: Partial<NewOrder>
): Lit.Types.LitVirtualizerContent<Projects.Hami.CustomerProjectModel> {
  return {
    component: 'lit-virtualizer',
    type: 'lit-virtualizer',

    // scroller: true,
    items: projects,
    layout: flow({
      direction: 'vertical',
    }),
    renderItem: (projects) => {
      return html`${projectItem(projects, order)}`;
    },
  };
}

function projectsListCard(
  projects: Projects.Hami.CustomerProjectModel[],
  order: Partial<NewOrder>,
  query = ''
): M3.Types.SurfaceCardRendererReturn {
  projects = projects.filter((project) => project.active === true);

  if (query.trim() !== '') {
    projects = projects.filter((project) =>
      String(Object.values(project).join(' ')).includes(query)
    );
  }

  if (projects.length === 0) {
    return M3.Renderers.renderSurfaceCard(notFoundListCard());
  }

  return M3.Renderers.renderSurfaceCard({
    component: 'surface-card',
    type: 'elevated',
    slotList: [
      projectList(projects, order) as Lit.Types.LitVirtualizerContent<unknown>,
    ],
  });
}

export function selectProjectPage(
  projects: Projects.Hami.CustomerProjectModel[],
  order: Partial<NewOrder>
): RenderResult {
  const headline = M3.Renderers.renderTypoGraphy(
    headingPageTypography(i18n.msg('select-project'))
  );

  return html`${headline}${projectsListCard(projects, order)}`;
}
