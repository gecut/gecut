import { html, unsafeCSS } from 'lit';
import { customElement } from 'lit/decorators.js';
import { loggerElement } from '@gecut/mixins';
import { dispatch, request } from '@gecut/signal';
import IconCallOutlineRounded from 'virtual:icons/material-symbols/call-outline-rounded';
import IconPasswordOutline from 'virtual:icons/material-symbols/lock-outline';
import IconLoginOutlineRounded from 'virtual:icons/material-symbols/login-rounded';

import '@gecut/form-builder';

import { requireSignIn } from '../../../controllers/require-sign-in';
import elementStyle from '../../stylesheets/element.scss?inline';
import pageStyle from '../../stylesheets/page.scss?inline';
import gecutLogo from '../../assets/gecut-logo.png?inline';
import hamiLogo from '../../assets/hami-logo.png?inline';
import i18n from '../../i18n';
import { routerGo, urlForName } from '../../router';

import styles from './sign-in.page.scss?inline';

import type { SignInRequest } from '@gecut/types/hami/user';
import type { Form } from '@gecut/form-builder';
import type { RenderResult } from '@gecut/types';

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
          label: i18n.message('sign_in_page_form_phone-number_label'),
          inputType: 'tel',
          minLength: 11,
          maxLength: 11,
          leadingIconSVG: IconCallOutlineRounded,
          hasLeadingIcon: true,
          validator: [
            {
              rule: 'required',
              errorMessage: i18n.message('sign_in_page_form_required_error'),
            },
            {
              rule: 'numeric',
              errorMessage: i18n.message('sign_in_page_form_numeric_error'),
            },
            {
              rule: 'phone',
              country: 'IR',
              errorMessage: i18n.message(
                  'sign_in_page_form_phone-number_error'
              ),
            },
          ],
        },
        {
          component: 'text-field',
          type: 'filled',
          inputType: 'password',
          name: 'password',
          label: i18n.message('sign_in_page_form_password_label'),
          leadingIconSVG: IconPasswordOutline,
          hasLeadingIcon: true,
          validator: [
            {
              rule: 'required',
              errorMessage: i18n.message('sign_in_page_form_required_error'),
            },
          ],
        },
        {
          component: 'button',
          type: 'filled',
          label: i18n.message('sign_in_page_form_submit'),
          iconSVG: IconLoginOutlineRounded,
          customConfig(target) {
            target.style.flexGrow = '0';
            target.style.marginInlineStart = 'auto';

            return target;
          },
        },
      ],
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
      <img class="hami-logo" src=${hamiLogo} />

      <div class="form-box">
        <form class="form">
          <h2>${i18n.message('sign_in_page_title')}</h2>
          <form-builder
            .data=${this.form}
            @submit=${this.onSubmit}
          ></form-builder>
        </form>
      </div>

      <img class="gecut-logo" src=${gecutLogo} />
    `;
  }

  private async onSubmit(event: HTMLElementEventMap['submit']) {
    if (event.detail.values != null) {
      const values = event.detail.values['sign-in'] as unknown as SignInRequest;

      try {
        await request('sign-in', values);

        routerGo(urlForName('Landing'));
      } catch (error) {
        this.log.error('onSignInButtonClick', 'sign_in_request_failed', error);
      }
    }
  }
}
