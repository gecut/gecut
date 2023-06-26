import { requireSignIn } from '#hami/controllers/require-sign-in';
import gecutLogo from '#hami/ui/assets/gecut-logo.webp?inline';
import hamiLogo from '#hami/ui/assets/hami-logo.webp?inline';
import icons from '#hami/ui/icons';
import { routerGo, urlForName } from '#hami/ui/router';
import elementStyle from '#hami/ui/stylesheets/element.scss?inline';
import pageStyle from '#hami/ui/stylesheets/page.scss?inline';

import i18n from '@gecut/i18n';
import { loggerElement } from '@gecut/mixins';
import { dispatch, request } from '@gecut/signal';
import { M3 } from '@gecut/ui-kit';
import { gecutIdleCallback } from '@gecut/utilities';
import { html, unsafeCSS } from 'lit';
import { customElement, state } from 'lit/decorators.js';

import styles from './sign-in.page.scss?inline';

import type { Form } from '@gecut/form-builder';
import type { RenderResult, Projects } from '@gecut/types';

declare global {
  interface HTMLElementTagNameMap {
    'page-sign-in': PageSignIn;
  }
}

@customElement('page-sign-in')
export class PageSignIn extends loggerElement {
  static override styles = [
    unsafeCSS(styles),
    unsafeCSS(elementStyle),
    unsafeCSS(pageStyle),
  ];

  private form: Form = {
    slides: {
      'sign-in': [
        {
          component: 'text-field',
          type: 'filled',
          name: 'phoneNumber',
          label: i18n.msg('phone-number'),
          inputType: 'tel',
          minLength: 11,
          maxLength: 11,
          textDirection: 'ltr',
          slotList: [
            {
              component: 'icon',
              type: 'svg',
              SVG: icons.outlineRounded.call,
              slot: 'leadingicon',
            },
          ],
          hasLeadingIcon: true,
          validator: [
            {
              rule: 'required',
              errorMessage: i18n.msg('it-is-required'),
            },
            {
              rule: 'numeric',
              errorMessage: i18n.msg('must-be-numeric'),
            },
            {
              rule: 'phone',
              country: 'IR',
              errorMessage: i18n.msg('phone-number-is-invalid'),
            },
          ],
        },
        {
          component: 'text-field',
          type: 'filled',
          inputType: 'password',
          name: 'password',
          label: i18n.msg('password'),
          textDirection: 'ltr',
          slotList: [
            {
              component: 'icon',
              type: 'svg',
              SVG: icons.outline.lock,
              slot: 'leadingicon',
            },
          ],
          hasLeadingIcon: true,
          validator: [
            {
              rule: 'required',
              errorMessage: i18n.msg('it-is-required'),
            },
          ],
        },
      ],
    },
  };

  @state()
  private submitButton: M3.Types.ButtonContent = {
      component: 'button',
      type: 'filled',
      label: i18n.msg('sign-in'),
      slotList: [
        {
          component: 'icon',
          type: 'svg',
          SVG: icons.filledRounded.login,
          slot: 'icon',
        },
      ],
      styles: { 'margin-inline-start': 'auto' },
      customConfig: (target) => {
        target.addEventListener('click', () => this.submitForm());

        return target;
      },
    };

  override connectedCallback() {
    super.connectedCallback();

    requireSignIn({ tryUrl: urlForName('Landing') });

    dispatch('top-app-bar-hidden', true);
    dispatch('bottom-app-bar-hidden', true);
  }

  override render(): RenderResult {
    super.render();

    return html`
      <img class="hami-logo" src=${hamiLogo} alt="hami-logo" />

      <div class="form-box">
        <form class="form">
          <h2>${i18n.msg('sign-in')}</h2>
          <form-builder .data=${this.form}></form-builder>

          <div class="button">
            ${M3.Renderers.renderButton(this.submitButton)}
          </div>
        </form>
      </div>

      <img class="gecut-logo" src=${gecutLogo} alt="gecut-logo" />
    `;
  }

  private async submitForm() {
    const formBuilder = this.renderRoot.querySelector('form-builder');

    if (
      formBuilder != null &&
      formBuilder.validate === true &&
      formBuilder.values != null
    ) {
      const values = formBuilder.values[
        'sign-in'
      ] as unknown as Projects.Hami.SignInRequest;

      this.submitButton = {
        ...this.submitButton,

        disabled: true,
      };

      const response = await request('sign-in', values).finally(() => {
        this.submitButton = {
          ...this.submitButton,

          disabled: false,
        };
      });

      gecutIdleCallback(() => {
        if (response.ok === true) {
          routerGo('/');
        }
      });
    }
  }
}
