import { css, html, unsafeCSS } from 'lit';
import { customElement } from 'lit/decorators.js';
import { loggerElement } from '@gecut/mixins';
import iconifyComponentStyles from '@gecut/common/styles/iconify-component.css?inline';
import typography from '@gecut/common/styles/modules/typography.module.css?raw';

import '@gecut/common/styles/pwa.css';
import '@gecut/common/styles/tokens.css';
import '@gecut/common/styles/mobile-only.css';
import '@gecut/common/styles/theme/palettes/cadmium-green.css';
import '~icons/material-symbols/mic';
import '~icons/material-symbols/mic-rounded';
import '@material/web/navigationbar/navigation-bar';
import '@material/web/navigationtab/navigation-tab';
import 'unfonts.css';

import { attachRouter } from '../../router';

import styles from './app.css?inline';

import '../../../providers/get-products-list';

import type { PropertyValues } from 'lit';
import type { NavigationTab, RenderResult } from '@gecut/types';

declare global {
  interface HTMLElementTagNameMap {
    'app-root': AppRoot;
  }
}

@customElement('app-root')
export class AppRoot extends loggerElement {
  static override styles = [
    unsafeCSS(styles),
    unsafeCSS(typography),
    unsafeCSS(iconifyComponentStyles),
  ];

  override render(): RenderResult {
    // ${AppRoot.renderNavigationBar(config.navigationTabs)}

    return html` <main role="main"></main> `;
  }

  override firstUpdated(changedProperties: PropertyValues<this>): void {
    super.firstUpdated(changedProperties);

    const mainContainer = this.renderRoot.querySelector('main');

    if (mainContainer != null) {
      attachRouter(mainContainer);
    }

    window.addEventListener('vaadin-router-location-changed', () =>
      this.requestUpdate()
    );
  }

  static renderNavigationBar(navigationTabs: NavigationTab[]): RenderResult {
    const navigationTabsTemplate = navigationTabs.map(this.renderNavigationTab);

    return html`
      <md-navigation-bar> ${navigationTabsTemplate} </md-navigation-bar>
    `;
  }

  static renderNavigationTab(tab: NavigationTab): RenderResult {
    return html`
      <a class="navigation-tab" href=${tab.link}>
        <md-navigation-tab
          label=${tab.label}
          badgeValue=${tab.badgeValue}
          ?active=${tab.link == location.pathname}
          ?showBadge=${tab.showBadge}
          ?hideInactiveLabel=${tab.hideInactiveLabel}
        >
          ${tab.icons.active} ${tab.icons.inActive}
        </md-navigation-tab>
      </a>
    `;
  }
}
