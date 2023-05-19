import { loggerElement } from '@gecut/mixins';
import { M3 } from '@gecut/ui-kit';
import '@lit-labs/virtualizer';
import { flow } from '@lit-labs/virtualizer/layouts/flow.js';
import { virtualize } from '@lit-labs/virtualizer/virtualize.js';
import { html, unsafeCSS } from 'lit';
import { customElement, property } from 'lit/decorators.js';

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

  @property({ type: Object, attribute: false })
    content: { data: Projects.Hami.ProductPrice[] } = { data: [] };

  override render(): RenderResult {
    super.render();

    return html`
      <div class="card">
        <div class="card-scroll">
          <md-list>
            ${virtualize({
    scroller: true,
    items: this.content.data,
    layout: flow({ direction: 'vertical' }),
    renderItem: (productPrice) => {
      return html`${ProductPriceCard.renderProductPriceItem(
        productPrice
      )}`;
    },
  })}
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
