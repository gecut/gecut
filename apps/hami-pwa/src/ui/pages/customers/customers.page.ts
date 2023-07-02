import { customersListCard } from '#hami/content/cards/customers-list-card';
import { newCustomerFAB } from '#hami/content/fabs/new-customer-fab';
import { headingPageTypography } from '#hami/content/typographies/heading-page-typography';
import { PageBase } from '#hami/ui/helpers/page-base';
import icons from '#hami/ui/icons';

import i18n from '@gecut/i18n';
import { dispatch, request } from '@gecut/signal';
import { M3 } from '@gecut/ui-kit';
import { html, unsafeCSS } from 'lit';
import { customElement, state } from 'lit/decorators.js';

import styles from './customers.page.scss?inline';

import type { Projects, RenderResult } from '@gecut/types';
import type { PropertyValues } from 'lit';

declare global {
  interface HTMLElementTagNameMap {
    'page-customers': PageCustomers;
  }
}

@customElement('page-customers')
export class PageCustomers extends PageBase {
  static override styles = [unsafeCSS(styles), ...PageBase.styles];

  @state()
  private customers: Record<string, Projects.Hami.CustomerModel> = {};

  @state()
  private query = '';

  private customersSearchBoxComponent = M3.Renderers.renderTextField({
    component: 'text-field',
    type: 'outlined',

    inputType: 'search',
    name: 'productPriceSearch',
    placeholder: i18n.msg('search'),
    hasLeadingIcon: true,
    slotList: [
      {
        component: 'icon',
        type: 'svg',
        SVG: icons.filledRounded.search,
        slot: 'leadingicon',
      },
    ],
    styles: { width: '100%' },
    customConfig: (target) => {
      target.addEventListener('input', () => {
        this.query = target.value;
      });

      return target;
    },
  });

  override connectedCallback(): void {
    super.connectedCallback();

    dispatch('fab', [newCustomerFAB()]);

    this.addSignalListener('customer-storage', (value) => {
      this.log.property?.('customer-storage', value);

      this.customers = value.data;
    });
  }


  override render(): RenderResult {
    super.render();

    return html`${this.renderCustomersCard()}`;
  }

  protected firstUpdated(changedProperties: PropertyValues<this>): void {
    super.firstUpdated(changedProperties);

    request('customer-storage', {}, 'cacheFirst');
  }

  private renderCustomersCard(): RenderResult {
    const titleTemplate = M3.Renderers.renderTypoGraphy(
      headingPageTypography(i18n.msg('customers'))
    );

    return html`
      <div class="card-box">
        ${titleTemplate}

        <div class="search-box">${this.customersSearchBoxComponent}</div>

        ${customersListCard(Object.values(this.customers), this.query)}
      </div>
    `;
  }
}
