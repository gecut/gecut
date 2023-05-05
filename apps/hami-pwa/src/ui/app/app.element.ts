import { html, unsafeCSS } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { unsafeSVG } from 'lit/directives/unsafe-svg.js';
import { loggerElement } from '@gecut/mixins';
import { addListener } from '@gecut/signal';
import IconMenuRounded from 'virtual:icons/material-symbols/menu-rounded';
import IconLanguageRounded from 'virtual:icons/material-symbols/language';

import '@material/web/circularprogress/circular-progress';
import '@material/web/navigationbar/navigation-bar';
import '@material/web/navigationtab/navigation-tab';
import '@material/web/icon/icon';
import '@gecut/components';

import { attachRouter } from '../router/index';
import config from '../../config';

import styles from './app.element.scss?inline';

import type { TopAppBarContent } from '@gecut/components';
import type { PropertyValues , PropertyDeclaration} from 'lit';
import type { NavigationTab, RenderResult } from '@gecut/types';

declare global {
  interface HTMLElementTagNameMap {
    'app-root': AppRoot;
  }
}

const getDate = () => {
  const now = new Date();

  return now.toLocaleDateString('en-US', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  });
};

@customElement('app-root')
export class AppRoot extends loggerElement {
  static override styles = [unsafeCSS(styles)];

  private topAppBarLoading = html`
    <md-circular-progress indeterminate> </md-circular-progress>
  `;

  @state()
  private topAppBarContent: TopAppBarContent = {
      headline: getDate(),
      type: 'center',
      leadingIcon: {
        icon: IconMenuRounded,
      },
      trailingIconList: [
        {
          icon: IconLanguageRounded,
        },
      ],
      trailingSlots: html`
      <md-circular-progress indeterminate> </md-circular-progress>
    `,
    };

  @state()
  private promisesListLength = 0;

  override connectedCallback(): void {
    super.connectedCallback();

    addListener('top-app-bar', (value) => {
      this.topAppBarContent = {
        ...this.topAppBarContent,
        ...value,
      };
    });

    addListener('promises-list', (value) => {
      this.promisesListLength = value.length;
    });
  }

  override requestUpdate(
      name?: PropertyKey | undefined,
      oldValue?: unknown,
      options?: PropertyDeclaration<unknown, unknown> | undefined
  ): void {
    super.requestUpdate(name, oldValue, options);

    if (name == 'promisesListLength') {
      if (this.promisesListLength > 0) {
        this.topAppBarContent['trailingSlots'] = this.topAppBarLoading;
      } else {
        delete this.topAppBarContent.trailingSlots;
      }
    }
  }

  override render(): RenderResult {
    return html`
      <top-app-bar .content=${this.topAppBarContent}></top-app-bar>
      <main role="main"></main>
      ${AppRoot.renderNavigationBar(config.navigationTabs)}
    `;
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
          <md-icon slot="activeIcon">
            ${unsafeSVG(String(tab.icons.active))}
          </md-icon>
          <md-icon slot="inactiveIcon">
            ${unsafeSVG(String(tab.icons.inActive))}
          </md-icon>
        </md-navigation-tab>
      </a>
    `;
  }
}
