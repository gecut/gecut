import '@gecut/components';
import { loggerElement } from '@gecut/mixins';
import { html, unsafeCSS } from 'lit';
import { customElement } from 'lit/decorators.js';

import i18n from '../i18n';
import { attachRouter } from '../router/index';

import styles from './app.element.scss?inline';

import type { RenderResult } from '@gecut/types';
import type { PropertyValues } from 'lit';

declare global {
  interface HTMLElementTagNameMap {
    'app-root': AppRoot;
  }
}

@customElement('app-root')
export class AppRoot extends loggerElement {
  static override styles = [unsafeCSS(styles)];

  override connectedCallback(): void {
    super.connectedCallback();

    i18n.init();
  }

  override render(): RenderResult {
    return html` <main role="main"></main> `;
  }

  override firstUpdated(changedProperties: PropertyValues<this>): void {
    super.firstUpdated(changedProperties);

    const mainContainer = this.renderRoot.querySelector('main');

    if (mainContainer != null) {
      attachRouter(mainContainer);
    }
  }
}
