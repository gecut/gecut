import { html, unsafeCSS } from 'lit';
import { customElement } from 'lit/decorators.js';
import { loggerElement } from '@gecut/mixins';
import { dispatch, request } from '@gecut/signal';
import IconCallOutlineRounded from 'virtual:icons/material-symbols/call-outline-rounded';
import IconPasswordOutline from 'virtual:icons/material-symbols/lock-outline';
import IconLoginOutlineRounded from 'virtual:icons/material-symbols/login-rounded';

import '@gecut/form-builder';

import elementStyle from '../../stylesheets/element.scss?inline';
import pageStyle from '../../stylesheets/page.scss?inline';
import gecutLogo from '../../assets/gecut-logo.png?inline';
import hamiLogo from '../../assets/hami-logo.png?inline';
import i18n from '../../i18n';
import { router } from '../../router';

import styles from './sign-in.page.scss?inline';

import type { SignInRequest } from '@gecut/types/hami/user';
import type { Button, Form, Input } from '@gecut/form-builder';
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

  private formValue: SignInRequest = {
    phoneNumber: '',
    password: '',
  };
  private form: Form = {
    valid: false,
    components: [
      {
        name: 'phoneNumber',
        label: i18n.message('sign_in_page_form_phone-number_label'),
        type: 'tel',
        ui: 'filled',
        minLength: 11,
        maxLength: 11,
        leadingIconSVG: IconCallOutlineRounded,
        hasLeadingIcon: true,
        validate: [
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
            errorMessage: i18n.message('sign_in_page_form_phone-number_error'),
          },
        ],
      },
      {
        type: 'password',
        name: 'password',
        label: i18n.message('sign_in_page_form_password_label'),
        ui: 'filled',
        leadingIconSVG: IconPasswordOutline,
        hasLeadingIcon: true,
        validate: [
          {
            rule: 'required',
            errorMessage: i18n.message('sign_in_page_form_required_error'),
          },
        ],
      },
      {
        type: 'submit',
        label: i18n.message('sign_in_page_form_submit'),
        ui: 'filled',
        align: 'end',
        iconSVG: IconLoginOutlineRounded,
        disabled: 'by_valid',
      },
    ],
    listener: (...args) => this.formListener(...args),
  };

  override connectedCallback() {
    super.connectedCallback();

    if (
      localStorage.getItem('USER_ID') != null &&
      localStorage.getItem('USER_TOKEN') != null
    ) {
      request('user', {}).then(() => {
        router.render('/home', true);
      });
    }

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
          <form-builder .data=${this.form}></form-builder>
        </form>
      </div>

      <img class="gecut-logo" src=${gecutLogo} />
    `;
  }

  private formListener(
      componentData: Input | Button,
      eventName: 'input' | 'change' | 'click',
      _event: InputEvent | PointerEvent
  ) {
    this.formValue = {
      phoneNumber: '',
      password: '',
    };

    for (const component of this.form.components.flat()) {
      if (component.type != 'submit') {
        this.formValue[component.name as keyof SignInRequest] =
          component.value ?? '';
      }
    }

    if (componentData.type == 'submit' && eventName === 'click') {
      this.onSignInButtonClick(componentData);
    }

    this.log.other?.(this.formValue);
  }

  private async onSignInButtonClick(button: Button) {
    button.disabled = true;

    await request('sign-in', this.formValue).then((value) => {
      router.render('/home', true);

      return value;
    });

    button.disabled = false;
  }
}
