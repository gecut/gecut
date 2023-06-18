import { requireSignIn } from '#hami/controllers/require-sign-in';
import { urlForName } from '#hami/ui/router';
import elementStyle from '#hami/ui/stylesheets/element.scss?inline';
import pageStyle from '#hami/ui/stylesheets/page.scss?inline';

import { scheduleSignalElement } from '@gecut/mixins';
import { dispatch, getValue } from '@gecut/signal';
import { html, unsafeCSS } from 'lit';
import { customElement } from 'lit/decorators.js';

import styles from './new-order.scss?inline';

import type { RenderResult } from '@gecut/types';

declare global {
  interface HTMLElementTagNameMap {
    'page-new-order': PageNewOrder;
  }
}

@customElement('page-new-order')
export class PageNewOrder extends scheduleSignalElement {
  static override styles = [
    unsafeCSS(styles),
    unsafeCSS(elementStyle),
    unsafeCSS(pageStyle),
  ];

  private topAppBarChangeModeDebounce?: NodeJS.Timeout;

  override connectedCallback(): void {
    super.connectedCallback();

    requireSignIn({ catchUrl: urlForName('Landing') });

    dispatch('top-app-bar-hidden', false);
    dispatch('bottom-app-bar-hidden', false);
    dispatch('fab', [
      {
        component: 'fab',
        type: 'fab',
        size: 'medium',
        variant: 'primary',
        label: 'next',
      },
      {
        component: 'fab',
        type: 'fab',
        size: 'medium',
        variant: 'primary',
        label: 'next',
      },
    ]);

    this.addEventListener('scroll', this.topAppBarChangeMode);
  }

  override disconnectedCallback(): void {
    super.disconnectedCallback();

    this.removeEventListener('scroll', this.topAppBarChangeMode);
  }

  override render(): RenderResult {
    super.render();

    return html``;
  }

  private topAppBarChangeMode(): void {
    if (this.topAppBarChangeModeDebounce != null) {
      clearTimeout(this.topAppBarChangeModeDebounce);
    }

    this.topAppBarChangeModeDebounce = setTimeout(() => {
      const scrollY = Math.floor(this.scrollTop / 10);

      if (scrollY > 0 && getValue('top-app-bar')?.mode !== 'on-scroll') {
        dispatch('top-app-bar', {
          mode: 'on-scroll',
        });
      }

      if (scrollY == 0 && getValue('top-app-bar')?.mode !== 'flat') {
        dispatch('top-app-bar', {
          mode: 'flat',
        });
      }
    }, 100);
  }
}
