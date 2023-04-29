import { html, unsafeCSS } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { repeat } from 'lit/directives/repeat.js';
import { loggerElement } from '@gecut/mixins';
import { createSignalProvider } from '@gecut/signal';

import '@material/web/circularprogress/circular-progress';

import '../../components/product-card/product-card';

import styles from './products.css?inline';

import type { ProductCardContent } from '../../components/product-card/product-card';
import type { Product, RenderResult } from '@gecut/types';

declare global {
  interface HTMLElementTagNameMap {
    'products-page': ProductsPage;
  }
}

@customElement('products-page')
export class ProductsPage extends loggerElement {
  static override styles = [unsafeCSS(styles)];

  static productsSignal = createSignalProvider('products');

  @state()
  private products: Product[] = [];

  override connectedCallback(): void {
    super.connectedCallback();

    ProductsPage.productsSignal.addListener((data) => {
      this.products = data;
    });

    ProductsPage.productsSignal.request({});
  }

  override render(): RenderResult {
    const productsTemplateCol1 = repeat(
        this.products.slice(0, Math.round(this.products.length / 2)),
        (product) => product.id,
        ProductsPage.renderProductCard
    );
    const productsTemplateCol2 = repeat(
        this.products.slice(
            Math.round(this.products.length / 2),
            this.products.length
        ),
        (product) => product.id,
        ProductsPage.renderProductCard
    );

    return html`
      <div class="row">
        <div class="column">${productsTemplateCol1}</div>
        <div class="column">${productsTemplateCol2}</div>
      </div>
      <div class="row circular-progress">
        <md-circular-progress indeterminate></md-circular-progress>
      </div>
    `;
  }

  static renderProductCard(product: Product): RenderResult {
    const content: ProductCardContent = {
      thumbnail: product.image,
      title: product.title,
      price: product.price,
    };

    return html`<product-card .data=${content}></product-card>`;
  }
}
