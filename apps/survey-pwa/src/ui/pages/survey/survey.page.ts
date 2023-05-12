import { html, unsafeCSS } from 'lit';
import { customElement } from 'lit/decorators.js';
import { signalElement } from '@gecut/mixins';
import IconEastRounded from 'virtual:icons/material-symbols/east-rounded';
// import IconCallOutlineRounded from 'virtual:icons/material-symbols/call-outline-rounded';
// import IconPasswordOutline from 'virtual:icons/material-symbols/lock-outline';

import '@gecut/form-builder';

import '@material/web/list/list';
import '@material/web/list/list-item';
import '@material/web/icon/icon';

import elementStyle from '../../stylesheets/element.scss?inline';
import pageStyle from '../../stylesheets/page.scss?inline';
import gecutLogo from '../../assets/gecut-logo.png?inline';
import i18n from '../../i18n';

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
    valid: false,
    components: [
      [
        {
          name: 'firstName',
          label: i18n.message('survey-page-form-first-name-label'),
          type: 'text',
          ui: 'filled',
          validate: [
            {
              rule: 'required',
              errorMessage: i18n.message('survey-page-form-required-error'),
            },
          ],
        },
        {
          name: 'lastName',
          type: 'text',
          label: i18n.message('survey-page-form-last-name-label'),
          ui: 'filled',
          validate: [
            {
              rule: 'required',
              errorMessage: i18n.message('survey-page-form-required-error'),
            },
          ],
        },
      ],
      {
        name: 'phoneNumber',
        type: 'tel',
        label: i18n.message('survey-page-form-phone-number-label'),
        ui: 'filled',
        validate: [
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
      {
        name: 'age',
        type: 'number',
        label: i18n.message('survey-page-form-age-label'),
        ui: 'filled',
        validate: [
          {
            rule: 'required',
            errorMessage: i18n.message('survey-page-form-required-error'),
          },
          {
            rule: 'numeric',
            errorMessage: i18n.message('survey-page-form-numeric-error'),
          },
        ],
      },

      {
        name: 'teacherFirstName',
        label: i18n.message('survey-page-form-teacher-first-name-label'),
        type: 'text',
        ui: 'filled',
      },
      {
        name: 'teacherLastName',
        label: i18n.message('survey-page-form-teacher-last-name-label'),
        type: 'text',
        ui: 'filled',
        validate: [
          {
            rule: 'required',
            errorMessage: i18n.message('survey-page-form-required-error'),
          },
        ],
      },
      {
        name: 'teacherPhoneNumber',
        type: 'tel',
        label: i18n.message('survey-page-form-teacher-phone-number-label'),
        ui: 'filled',
        validate: [
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
      {
        type: 'submit',
        label: i18n.message('survey-page-form-submit'),
        ui: 'filled',
        align: 'end',
        iconSVG: IconEastRounded,
        disabled: 'by_valid',
      },
    ],
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
