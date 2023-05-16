import { loggerElement } from '@gecut/mixins';
import { M3 } from '@gecut/ui-kit';
import { html, unsafeCSS } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { repeat } from 'lit/directives/repeat.js';

import elementStyle from '../../stylesheets/element.scss?inline';

import styles from './product-price-card.scss?inline';

import type { Projects, RenderResult } from '@gecut/types';

declare global {
  interface HTMLElementTagNameMap {
    'product-price-card': ProductPriceCard;
  }
}

@customElement('product-price-card')
export class ProductPriceCard extends loggerElement {
  static override styles = [unsafeCSS(styles), unsafeCSS(elementStyle)];

  @property()
    productsPrice: Projects.Hami.ProductPrice[] = [];

  override render(): RenderResult {
    super.render();

    return html`
      <div class="card">
        <div class="card-scroll">
          <md-list>
            ${repeat(
    this.productsPrice.splice(0, 20),
    (productPrice) => productPrice.id,
    ProductPriceCard.renderProductPriceItem
  )}
          </md-list>
        </div>

        <md-elevation></md-elevation>
      </div>
    `;
  }

  static renderProductPriceItem(
    productPrice: Projects.Hami.ProductPrice
  ): HTMLElement {
    return M3.Renderers.renderListItem({
      component: 'list-item',
      type: 'list-item',
      headline: productPrice.name,
      supportingText: productPrice.normalPrice.toLocaleString(),
      trailingSupportingText: productPrice.minPrice.toLocaleString(),
      classes: ['product-price-item'],
    });
  }
}
