import { loggerElement } from '@gecut/mixins';
import '@material/web/elevation/elevation';
import { css, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import type { RenderResult } from '@gecut/types';

declare global {
  interface HTMLElementTagNameMap {
    'surface-card': SurfaceCard;
  }
}

@customElement('surface-card')
export class SurfaceCard extends loggerElement {
  static override styles = css`
    :host {
      display: flex;
      flex-direction: column;
    }

    :host([type='elevated']) {
      background: var(
        --md-sys-color-surface-container-low,
        var(--md-sys-color-surface-container, #f0f1ec)
      );
    }
    :host([type='outlined']) {
      border: 1px solid var(--md-sys-color-outline);
      background: var(--md-sys-color-surface, #fbfdf8);
    }
    :host([type='filled']) {
      background: var(--md-sys-color-surface-container-highest, #2e312e);
    }
  `;

  @property({ type: String, reflect: true })
    type: 'elevated' | 'outlined' | 'filled' = 'elevated';

  override render(): RenderResult {
    super.render();

    return html`
      <div class="slots">
        <slot></slot>
      </div>
      <md-elevation></md-elevation>
    `;
  }
}
