import type { MongoBase } from '#persianpart/entity/base';

import i18n from '@gecut/i18n';
import { customElement } from 'lit/decorators.js';

import { PageSearchList } from '../bases/search-list/search-list.page';

declare global {
  interface HTMLElementTagNameMap {
    'page-products': PageProducts;
  }
}

@customElement('page-products')
export class PageProducts extends PageSearchList<MongoBase> {
  override connectedCallback() {
    this.headline = i18n.msg('product-list');
    
    super.connectedCallback();
  }
}
