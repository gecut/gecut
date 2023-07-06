import { notificationListCard } from '#hami/content/cards/notification-list-card';
import { productPriceListCard } from '#hami/content/cards/product-price-list-card';
import { newNotificationFAB } from '#hami/content/fabs/new-notification-fab';
import { newProductPriceFAB } from '#hami/content/fabs/new-product-price-fab';
import { headingPageTypography } from '#hami/content/typographies/heading-page-typography';
import { ifAdmin } from '#hami/controllers/if-admin';
import { PageBase } from '#hami/ui/helpers/page-base';
import icons from '#hami/ui/icons';
import elementStyle from '#hami/ui/stylesheets/element.scss?inline';
import pageStyle from '#hami/ui/stylesheets/page.scss?inline';

import i18n from '@gecut/i18n';
import { dispatch, request } from '@gecut/signal';
import { M3 } from '@gecut/ui-kit';
import { html, unsafeCSS } from 'lit';
import { customElement, state } from 'lit/decorators.js';

import styles from './home.page.scss?inline';

import type { Projects, RenderResult } from '@gecut/types';
import type { PropertyValues } from 'lit';

declare global {
  interface HTMLElementTagNameMap {
    'page-home': PageHome;
  }
}

@customElement('page-home')
export class PageHome extends PageBase {
  static override styles = [
    unsafeCSS(styles),
    unsafeCSS(elementStyle),
    unsafeCSS(pageStyle),
  ];

  @state()
  private notificationStorage: Record<string, Projects.Hami.Notification> = {};

  @state()
  private productsPriceStorage: Record<string, Projects.Hami.ProductPrice> = {};

  @state()
  private productsPriceQuery = '';

  private productsPriceSearchBoxComponent = M3.Renderers.renderTextField({
    component: 'text-field',
    type: 'outlined',

    attributes: {
      inputType: 'search',
      name: 'productPriceSearch',
      label: i18n.msg('search'),
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
        this.productsPriceQuery = target.value;
      });

      return target;
    },
  });

  override connectedCallback(): void {
    super.connectedCallback();

    ifAdmin(() => {
      dispatch('fab', [newProductPriceFAB(), newNotificationFAB()]);
    });

    this.addSignalListener('notification-storage', (value) => {
      this.log.property?.('notification-storage', value);

      this.notificationStorage = value.data ?? {};
    });
    this.addSignalListener('product-price-storage', (value) => {
      this.log.property?.('product-price-storage', value);

      this.productsPriceStorage = value.data ?? {};
    });
  }

  override render(): RenderResult {
    super.render();

    return html`
      ${this.renderNotificationCard()} ${this.renderProductPriceCard()}
    `;
  }

  protected firstUpdated(changedProperties: PropertyValues<this>): void {
    super.firstUpdated(changedProperties);

    request('notification-storage', {}, 'cacheFirst');
    request('product-price-storage', {}, 'cacheFirst');
  }

  private renderNotificationCard(): RenderResult {
    return html`
      ${M3.Renderers.renderTypoGraphy(
        headingPageTypography(i18n.msg('notifications'))
      )}
      ${notificationListCard(Object.values(this.notificationStorage))}
    `;
  }

  private renderProductPriceCard(): RenderResult {
    return html`
      ${M3.Renderers.renderTypoGraphy(
        headingPageTypography(i18n.msg('price-list'))
      )}

      <div class="search-box">${this.productsPriceSearchBoxComponent}</div>

      ${productPriceListCard(
        Object.values(this.productsPriceStorage),
        this.productsPriceQuery
      )}
    `;
  }
}
