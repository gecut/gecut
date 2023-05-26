import elementStyle from '#hami/ui/stylesheets/element.scss?inline';

import { loggerElement } from '@gecut/mixins';
import '@material/web/elevation/elevation';
import { html, unsafeCSS } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import styles from './surface-card.scss?inline';

import type { RenderResult } from '@gecut/types';

declare global {
  interface HTMLElementTagNameMap {
    'surface-card': SurfaceCard;
  }
}

@customElement('surface-card')
export class SurfaceCard extends loggerElement {
  static override styles = [unsafeCSS(styles), unsafeCSS(elementStyle)];

  // TODO: 'elevated' | 'outlined' | 'filled'
  @property({ type: String, reflect: true })
    type = 'elevated';

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
