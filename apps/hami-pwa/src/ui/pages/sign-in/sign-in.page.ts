import { requireSignIn } from '#hami/controllers/require-sign-in';
import gecutLogo from '#hami/ui/assets/gecut-logo.webp?inline';
import hamiLogo from '#hami/ui/assets/hami-logo.webp?inline';
import i18n from '#hami/ui/i18n';
import { routerGo, urlForName } from '#hami/ui/router';
import elementStyle from '#hami/ui/stylesheets/element.scss?inline';
import pageStyle from '#hami/ui/stylesheets/page.scss?inline';

import { loggerElement } from '@gecut/mixins';
import { dispatch, request } from '@gecut/signal';
import { html, unsafeCSS } from 'lit';
import { customElement } from 'lit/decorators.js';
import IconCallOutlineRounded from 'virtual:icons/material-symbols/call-outline-rounded';
import IconPasswordOutline from 'virtual:icons/material-symbols/lock-outline';
import IconLoginOutlineRounded from 'virtual:icons/material-symbols/login-rounded';

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
          label: i18n.message('sign_in_page_form_phone-number_label'),
          inputType: 'tel',
          minLength: 11,
          maxLength: 11,
          slotList: [
            {
              component: 'icon',
              type: 'svg',
              SVG: IconCallOutlineRounded,
              slot: 'leadingicon',
            },
          ],
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
          slotList: [
            {
              component: 'icon',
              type: 'svg',
              SVG: IconPasswordOutline,
              slot: 'leadingicon',
            },
          ],
          hasLeadingIcon: true,
          validator: [
            {
              rule: 'required',
              errorMessage: i18n.message('sign_in_page_form_required_error'),
            },
          ],
        },
        [
          {
            component: 'button',
            type: 'filled',
            label: i18n.message('sign_in_page_form_submit'),
            action: 'form_submit',
            slotList: [
              {
                component: 'icon',
                type: 'svg',
                SVG: IconLoginOutlineRounded,
                slot: 'icon',
              },
            ],
            styles: { flexGrow: '0', marginInlineStart: 'auto' },
          },
        ],
      ],
    },
  };

  override connectedCallback() {
    super.connectedCallback();

    requireSignIn({ tryUrl: urlForName('Landing') });

    dispatch('top-app-bar-hidden', true);
    dispatch('bottom-app-bar-hidden', true);

    document
      .querySelector('app-root')
      ?.renderRoot?.querySelector('md-branded-fab')
      ?.remove();
  }

  override render(): RenderResult {
    super.render();

    return html`
      <img class="hami-logo" src=${hamiLogo} alt="hami-logo" />

      <div class="form-box">
        <form class="form">
          <h2>${i18n.message('sign_in_page_title')}</h2>
          <form-builder
            .data=${this.form}
            @submit=${this.onSubmit}
          ></form-builder>
        </form>
      </div>

      <img class="gecut-logo" src=${gecutLogo} alt="gecut-logo" />
    `;
  }

  private async onSubmit(event: HTMLElementEventMap['submit']) {
    if (event.detail.values != null) {
      const values = event.detail.values[
        'sign-in'
      ] as unknown as Projects.Hami.SignInRequest;

      try {
        await request('sign-in', values);

        routerGo('/');
      } catch (error) {
        this.log.error('onSignInButtonClick', 'sign_in_request_failed', error);
      }
    }
  }
}
