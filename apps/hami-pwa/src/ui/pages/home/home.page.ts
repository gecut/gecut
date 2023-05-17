import { dispatch, request } from '@gecut/signal';
import { html, unsafeCSS } from 'lit';
import { customElement } from 'lit/decorators.js';

import { requireSignIn } from '../../../controllers/require-sign-in';
import { urlForName } from '../../router';
import elementStyle from '../../stylesheets/element.scss?inline';
import pageStyle from '../../stylesheets/page.scss?inline';

import { HomeComponents } from './home.components';
import styles from './home.page.scss?inline';

import type { RenderResult } from '@gecut/types';

declare global {
  interface HTMLElementTagNameMap {
    'page-home': PageHome;
  }
}

@customElement('page-home')
export class PageHome extends HomeComponents {
  static override styles = [
    unsafeCSS(styles),
    unsafeCSS(elementStyle),
    unsafeCSS(pageStyle),
  ];

  override connectedCallback(): void {
    super.connectedCallback();

    requireSignIn({ catchUrl: urlForName('Landing') });

    dispatch('top-app-bar-hidden', false);
    dispatch('bottom-app-bar-hidden', false);

    this.addEventListener('scroll', this.topAppBarChangeMode);

    request('notification-storage', {});
    request('product-price-storage', {});
  }
  override disconnectedCallback(): void {
    super.disconnectedCallback();

    this.removeEventListener('scroll', this.topAppBarChangeMode);
  }

  override render(): RenderResult {
    super.render();

    return html`
      ${this.renderNotificationCard()} ${this.renderProductPriceCard()}
    `;
  }

  private topAppBarChangeMode(): void {
    const scrollY = this.scrollTop;

    if (Math.floor(scrollY / 10) != 0) {
      dispatch('top-app-bar', {
        mode: 'on-scroll',
      });
    } else {
      dispatch('top-app-bar', {
        mode: 'flat',
      });
    }
  }
}
