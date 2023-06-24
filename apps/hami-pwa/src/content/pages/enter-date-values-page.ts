import type { NewOrder } from '#hami/config';

import i18n from '@gecut/i18n';
import { dispatch } from '@gecut/signal';
import { M3 } from '@gecut/ui-kit';
import { html } from 'lit';

import { dateSelect } from '../selects/date-select';
import { headingPageTypography } from '../typographies/heading-page-typography';

import type { RenderResult } from '@gecut/types';

function dateCard(order: Partial<NewOrder>): M3.Types.SurfaceCardContent {
  return {
    component: 'surface-card',
    type: 'elevated',
    styles: {
      'margin-top': 'var(--sys-spacing-track,8px)',
      'margin-bottom': 'calc(2*var(--sys-spacing-track,8px))',
      padding: 'calc(2*var(--sys-spacing-track,8px))',
      'padding-top': 'var(--sys-spacing-track,8px)',
    },
    slotList: [
      {
        component: 'typography',
        type: 'h1',
        slotList: [i18n.msg('date')],
        classes: ['surface-card__title'],
      },
      {
        component: 'form-builder',
        type: 'form-builder',
        styles: {
          'margin-top': '8px',
        },
        styleVars: {
          '--padding-side': '0',
        },
        activeSlide: 'initial',
        data: {
          slides: {
            initial: [
              dateSelect(
                order.registrationDate,
                'registrationDate',
                i18n.msg('registration-date'),
                1
              ),
              dateSelect(
                order.evacuationDate,
                'evacuationDate',
                i18n.msg('evacuation-date')
              ),
            ],
          },
          onChange: (event) => {
            const date = event.values?.['initial'];

            if (date != null) {
              dispatch('new-order', {
                registrationDate: Number(date['registrationDate']),
                evacuationDate: Number(date['evacuationDate']),
              });
            }
          },
        },
      },
    ],
  };
}

export function enterDateValuesPage(order: Partial<NewOrder>): RenderResult {
  const headline = M3.Renderers.renderTypoGraphy(
    headingPageTypography(i18n.msg('enter-date-values'))
  );

  const template = [
    headline,
    M3.Renderers.renderSurfaceCard(dateCard(order)),
  ] as const;

  return html`${template}`;
}
