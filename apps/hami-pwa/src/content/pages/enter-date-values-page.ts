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
    attributes: {
      styles: {
        'margin-top': 'var(--sys-spacing-track,8px)',
        'margin-bottom': 'calc(2*var(--sys-spacing-track,8px))',
        padding: 'calc(2*var(--sys-spacing-track,8px))',
        'padding-top': 'var(--sys-spacing-track,8px)',
      },
    },
    children: [
      {
        component: 'form-builder',
        type: 'form-builder',
        attributes: {
          styles: {
            'margin-top': '8px',
            '--padding-side': '0',
          },
          activeSlide: 'initial',
          data: {
            slides: {
              initial: [
                dateSelect(order.registrationDate, {
                  attributes: {
                    name: 'registrationDate',
                    label: i18n.msg('registration-date'),
                  },
                }),
                dateSelect(order.evacuationDate, {
                  attributes: {
                    name: 'evacuationDate',
                    label: i18n.msg('evacuation-date'),
                  },
                }),
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
