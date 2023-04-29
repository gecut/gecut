import { html, nothing, unsafeCSS } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { loggerElement } from '@gecut/mixins';
import typography from '@gecut/common/styles/modules/typography.module.css?raw';
import colors from '@gecut/common/styles/modules/colors.module.css?raw';

import '@material/web/elevation/elevation';

import styles from './product-card.css?inline';

import type { RenderResult } from '@gecut/types';

declare global {
  interface HTMLElementTagNameMap {
    'product-card': ProductCard;
  }
}

export type ProductCardContent = {
  thumbnail: string;
  title: string;
  price: number;
};

@customElement('product-card')
export class ProductCard extends loggerElement {
  static override styles = [
    unsafeCSS(styles),
    unsafeCSS(typography),
    unsafeCSS(colors),
  ];

  @property({ type: Object, attribute: false })
  private data?: ProductCardContent;

  override render(): RenderResult {
    super.render();

    if (this.data == null) return nothing;

    return html`
      <div class="img-box">
        <img src=${this.data.thumbnail} />
      </div>
      <h2 class="body-medium on-surface-text">${this.data.title}</h2>
      <p class="label-large on-surface-variant-text">
        ${this.data.price.toLocaleString('en-US')}
      </p>
      <md-elevation></md-elevation>
    `;
  }
}
