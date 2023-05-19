import { loggerElement } from '@gecut/mixins';
import { dispatch, getValue } from '@gecut/signal';
import { M3 } from '@gecut/ui-kit';
import { html, unsafeCSS } from 'lit';
import { customElement } from 'lit/decorators.js';

import { requireSignIn } from '../../../controllers/require-sign-in';
import { urlForName } from '../../router';
import elementStyle from '../../stylesheets/element.scss?inline';
import pageStyle from '../../stylesheets/page.scss?inline';

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

  override connectedCallback() {
    super.connectedCallback();

    dispatch('top-app-bar-hidden', true);
    dispatch('bottom-app-bar-hidden', true);
  }

  override render(): RenderResult {
    super.render();

    return html`
      ${M3.Renderers.renderCircularProgress({
    component: 'circular-progress',
    type: 'circular-progress',
    fourColor: true,
    indeterminate: true,
  })}
    `;
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
      const user = getValue('user');

      if (user != null) {
        dispatch('snack-bar', {
          component: 'snack-bar',
          type: 'ellipsis-message',
          message: user.firstName,
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
