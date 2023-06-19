import config from '#hami/config';
import { requireSignIn } from '#hami/controllers/require-sign-in';
import { urlForName } from '#hami/ui/router';
import elementStyle from '#hami/ui/stylesheets/element.scss?inline';
import pageStyle from '#hami/ui/stylesheets/page.scss?inline';

import i18n from '@gecut/i18n';
import { loggerElement } from '@gecut/mixins';
import { dispatch, request } from '@gecut/signal';
import { M3 } from '@gecut/ui-kit';
import { html, unsafeCSS } from 'lit';
import { customElement } from 'lit/decorators.js';

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

  static progressTemplate = M3.Renderers.renderCircularProgress({
    component: 'circular-progress',
    type: 'circular-progress',
    fourColor: true,
    indeterminate: true,
  });

  override connectedCallback() {
    super.connectedCallback();

    dispatch('fab', []);
    dispatch('top-app-bar-hidden', true);
    dispatch('bottom-app-bar-hidden', true);
  }

  override render(): RenderResult {
    super.render();

    return html`${PageLanding.progressTemplate}`;
  }

  override async firstUpdated(
    changedProperties: PropertyValues<this>
  ): Promise<void> {
    super.firstUpdated(changedProperties);

    const isSignIn = await requireSignIn({
      tryUrl: urlForName('Home'),
      catchUrl: urlForName('SignIn'),
    });

    if (isSignIn === true) {
      const user = await request('user', {}, 'cacheFirst');

      if (user != null) {
        dispatch('snack-bar', {
          component: 'snack-bar',
          type: 'ellipsis-message',
          message: i18n.msg('welcome-message', config.version, user.lastName),
          closeButton: true,
        });
      }
    }

    if (isSignIn === false) {
      localStorage.removeItem('USER_ID');
      localStorage.removeItem('USER_TOKEN');
    }
  }
}
