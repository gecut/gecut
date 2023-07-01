import { attachRouter } from '#hami/ui/router';

import { signalElement } from '@gecut/mixins';
import { html, unsafeCSS } from 'lit';
import { customElement } from 'lit/decorators.js';

import styles from './app.element.css?inline';

import type { RenderResult } from '@gecut/types';
import type { PropertyValues } from 'lit';

declare global {
  interface HTMLElementTagNameMap {
    'app-root': AppRoot;
  }
}

@customElement('app-root')
export class AppRoot extends signalElement {
  static override styles = [unsafeCSS(styles)];

  override connectedCallback(): void {
    super.connectedCallback();
  }

  override render(): RenderResult {
    return html`<main role="main"></main>`;
  }

  override firstUpdated(changedProperties: PropertyValues<this>): void {
    super.firstUpdated(changedProperties);

    const mainContainer = this.renderRoot.querySelector('main');

    if (mainContainer != null) {
      attachRouter(mainContainer);
    }

    window.addEventListener('vaadin-router-location-changed', () =>
      this.requestUpdate()
    );
  }
}
