import { productsListCard } from '#hami/content/cards/products-list-card';
import { newProductFAB } from '#hami/content/fabs/new-product-fab';
import { headingPageTypography } from '#hami/content/typographies/heading-page-typography';
import { ifAdmin } from '#hami/controllers/if-admin';
import { PageBase } from '#hami/ui/helpers/page-base';
import icons from '#hami/ui/icons';

import i18n from '@gecut/i18n';
import { dispatch, request } from '@gecut/signal';
import { M3 } from '@gecut/ui-kit';
import { html, unsafeCSS } from 'lit';
import { customElement, state } from 'lit/decorators.js';

import styles from './products.page.scss?inline';

import type { Projects, RenderResult } from '@gecut/types';
import type { PropertyValues } from 'lit';

declare global {
  interface HTMLElementTagNameMap {
    'page-products': PageProducts;
  }
}

@customElement('page-products')
export class PageProducts extends PageBase {
  static override styles = [unsafeCSS(styles), ...PageBase.styles];

  @state()
  private products: Record<string, Projects.Hami.Product> = {};

  @state()
  private query = '';

  private productsSearchBoxComponent = M3.Renderers.renderTextField({
    component: 'text-field',
    type: 'outlined',

    attributes: {
      inputType: 'search',
      name: 'productsSearch',
      placeholder: i18n.msg('search'),
      hasLeadingIcon: true,
      styles: { width: '100%' },
    },
    children: [
      {
        component: 'icon',
        type: 'svg',
        SVG: icons.filledRounded.search,
        attributes: { slot: 'leadingicon' },
      },
    ],
    transformers: (target) => {
      target.addEventListener('input', () => {
        this.query = target.value;
      });

      return target;
    },
  });

  override connectedCallback(): void {
    super.connectedCallback();

    ifAdmin(() => {
      dispatch('fab', [newProductFAB()]);
    });

    this.addSignalListener('product-storage', (value) => {
      this.log.property?.('product-storage', value);

      this.products = value.data;
    });
  }

  override render(): RenderResult {
    super.render();

    return html`${this.renderProductsCard()}`;
  }

  protected firstUpdated(changedProperties: PropertyValues<this>): void {
    super.firstUpdated(changedProperties);

    request('product-storage', {}, 'cacheFirst');
  }

  private renderProductsCard(): RenderResult {
    const titleTemplate = M3.Renderers.renderTypoGraphy(
        headingPageTypography(i18n.msg('products'))
    );

    return html`
      <div class="card-box">
        ${titleTemplate}

        <div class="search-box">${this.productsSearchBoxComponent}</div>

        ${productsListCard(Object.values(this.products), this.query)}
      </div>
    `;
  }
}
