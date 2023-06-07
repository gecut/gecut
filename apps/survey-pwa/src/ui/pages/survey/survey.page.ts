import '@gecut/form-builder';
import { signalElement } from '@gecut/mixins';
import '@material/web/icon/icon';
import '@material/web/list/list';
import '@material/web/list/list-item';
import { html, unsafeCSS } from 'lit';
import { customElement } from 'lit/decorators.js';
import IconEastRounded from 'virtual:icons/material-symbols/east-rounded';
import IconWestRounded from 'virtual:icons/material-symbols/west-rounded';

import gecutLogo from '../../assets/gecut-logo.png?inline';
import i18n from '../../i18n';
import elementStyle from '../../stylesheets/element.scss?inline';
import pageStyle from '../../stylesheets/page.scss?inline';

import styles from './survey.page.scss?inline';

import type { Form } from '@gecut/form-builder';
import type { RenderResult } from '@gecut/types';

declare global {
  interface HTMLElementTagNameMap {
    'page-survey': PageSurvey;
  }
}

@customElement('page-survey')
export class PageSurvey extends signalElement {
  static override styles = [
    unsafeCSS(styles),
    unsafeCSS(elementStyle),
    unsafeCSS(pageStyle),
  ];

  private form: Form = {
    slides: {
      personal: [
        {
          component: 'text-field',
          type: 'filled',
          name: 'firstName',
          label: i18n.message('survey-page-form-first-name-label'),
          inputType: 'text',
          required: true,
          validator: [
            {
              rule: 'required',
              errorMessage: i18n.message('survey-page-form-required-error'),
            },
          ],
        },
        {
          component: 'text-field',
          type: 'filled',
          name: 'lastName',
          inputType: 'text',
          label: i18n.message('survey-page-form-last-name-label'),
          required: true,
          validator: [
            {
              rule: 'required',
              errorMessage: i18n.message('survey-page-form-required-error'),
            },
          ],
        },
        {
          component: 'text-field',
          type: 'filled',
          name: 'phoneNumber',
          inputType: 'tel',
          label: i18n.message('survey-page-form-phone-number-label'),
          required: true,
          validator: [
            {
              rule: 'required',
              errorMessage: i18n.message('survey-page-form-required-error'),
            },
            {
              rule: 'numeric',
              errorMessage: i18n.message('survey-page-form-numeric-error'),
            },
            {
              rule: 'phone',
              country: 'IR',
              errorMessage: i18n.message('survey-page-form-phone-number-error'),
            },
          ],
        },
        [
          {
            component: 'button',
            type: 'tonal',
            label: i18n.message('survey-page-form-next-button'),
            slotList: [
              {
                component: 'icon',
                type: 'svg',
                slot: 'icon',
                SVG: IconEastRounded,
              },
            ],
            hasIcon: true,
            action: 'next_slide',
            customConfig(target) {
              target.style.flexGrow = '0';
              target.style.marginInlineStart = 'auto';

              return target;
            },
          },
        ],
      ],
      teacher: [
        {
          component: 'text-field',
          type: 'filled',
          name: 'firstName',
          label: i18n.message('survey-page-form-teacher-first-name-label'),
          inputType: 'text',
        },
        {
          component: 'text-field',
          type: 'filled',
          name: 'lastName',
          inputType: 'text',
          label: i18n.message('survey-page-form-teacher-last-name-label'),
          required: true,
          validator: [
            {
              rule: 'required',
              errorMessage: i18n.message('survey-page-form-required-error'),
            },
          ],
        },
        {
          component: 'text-field',
          type: 'filled',
          name: 'phoneNumber',
          inputType: 'tel',
          label: i18n.message('survey-page-form-teacher-phone-number-label'),
          required: true,
          validator: [
            {
              rule: 'required',
              errorMessage: i18n.message('survey-page-form-required-error'),
            },
            {
              rule: 'numeric',
              errorMessage: i18n.message('survey-page-form-numeric-error'),
            },
            {
              rule: 'phone',
              country: 'IR',
              errorMessage: i18n.message('survey-page-form-phone-number-error'),
            },
          ],
        },
        [
          {
            component: 'button',
            type: 'tonal',
            label: i18n.message('survey-page-form-next-button'),
            slotList: [
              {
                component: 'icon',
                type: 'svg',
                slot: 'icon',
                SVG: IconEastRounded,
              },
            ],
            hasIcon: true,
            action: 'next_slide',
            customConfig(target) {
              target.style.flexGrow = '0';
              target.style.marginInlineStart = 'auto';

              return target;
            },
          },
          {
            component: 'button',
            type: 'text',
            label: i18n.message('survey-page-form-previous-button'),
            slotList: [
              {
                component: 'icon',
                type: 'svg',
                slot: 'icon',
                SVG: IconWestRounded,
              },
            ],
            hasIcon: true,
            trailingIcon: true,
            action: 'previous_slide',
            customConfig(target) {
              target.style.flexGrow = '0';

              return target;
            },
          },
        ],
      ],
    },
  };

  override render(): RenderResult {
    super.render();

    return html`
      <div class="form-box">
        <form class="form">
          <h2>${i18n.message('survey-page-title')}</h2>
          <form-builder .data=${this.form}></form-builder>
        </form>
      </div>

      <img class="gecut-logo" src=${gecutLogo} />
    `;
  }
}
