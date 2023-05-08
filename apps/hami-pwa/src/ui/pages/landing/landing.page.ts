import { html, unsafeCSS } from 'lit';
import { customElement } from 'lit/decorators.js';
import { loggerElement } from '@gecut/mixins';
import { dispatch, request } from '@gecut/signal';

import '@material/web/circularprogress/circular-progress';

import elementStyle from '../../stylesheets/element.scss?inline';
import pageStyle from '../../stylesheets/page.scss?inline';
import { router } from '../../router';

import styles from './landing.page.scss?inline';

import type { RenderResult } from '@gecut/types';
import type { PropertyValues } from 'lit';

declare global {
  interface HTMLElementTagNameMap {
    'page-landing': PageLanding;
  }
}

@customElement('page-landing')
export class PageLanding extends loggerElement {
  static override styles = [
    unsafeCSS(styles),
    unsafeCSS(elementStyle),
    unsafeCSS(pageStyle),
  ];

  private userId?: number;
  private userToken?: string;

  override connectedCallback() {
    super.connectedCallback();

    this.userId = Number(localStorage.getItem('USER_ID')) ?? undefined;
    this.userToken = localStorage.getItem('USER_TOKEN') ?? undefined;

    dispatch('top-app-bar-hidden', true);
    dispatch('bottom-app-bar-hidden', true);
  }

  override render(): RenderResult {
    super.render();

    return html`
      <md-circular-progress indeterminate fourColor></md-circular-progress>
    `;
  }

  override firstUpdated(changedProperties: PropertyValues<this>): void {
    super.firstUpdated(changedProperties);

    requestIdleCallback(() => {
      if (this.userId != null && this.userToken != null) {
        request('user', {})
            .then(() => {
              router.render('/home', true);

            // TODO show welcome snackbar
            })
            .catch(() => {
              PageLanding.getUserHasError();
            });
      } else {
        PageLanding.getUserHasError();
      }
    });
  }

  static getUserHasError() {
    localStorage.removeItem('USER_ID');
    localStorage.removeItem('USER_TOKEN');

    router.render('/sign-in', true);
  }
}
