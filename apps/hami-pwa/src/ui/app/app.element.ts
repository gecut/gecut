import config from '#hami/config';
import { confirmLogoutDialog } from '#hami/content/dialogs/confirm-logout';
import hamiLogo from '#hami/ui/assets/hami-logo.webp?inline';
import icons from '#hami/ui/icons';
import { attachRouter } from '#hami/ui/router';

import i18n from '@gecut/i18n';
import { signalElement } from '@gecut/mixins';
import { dispatch } from '@gecut/signal';
import { M3 } from '@gecut/ui-kit';
import { gecutAnimationFrame, gecutIdleCallback } from '@gecut/utilities';
import '@material/web/icon/icon';
import '@material/web/labs/navigationbar/navigation-bar';
import '@material/web/labs/navigationtab/navigation-tab';
import { html, nothing, unsafeCSS } from 'lit';
import { customElement, query, state } from 'lit/decorators.js';
import { unsafeSVG } from 'lit/directives/unsafe-svg.js';
import { registerSW } from 'virtual:pwa-register';

import styles from './app.element.scss?inline';

import type { RenderResult } from '@gecut/types';
import type { PropertyValues } from 'lit';

declare global {
  interface HTMLElementTagNameMap {
    'app-root': AppRoot;
  }
}

@customElement('app-root')
export class AppRoot extends signalElement {
  static override styles = [unsafeCSS(styles)];

  @state()
  private loading = true;

  @state()
  private topAppBarMode: 'flat' | 'on-scroll' = 'flat';

  @state()
  private topAppBarHidden = false;

  @state()
  private bottomAppBarHidden = false;

  @query('div.fixed')
  private fixedDivision?: HTMLDivElement;

  override connectedCallback(): void {
    super.connectedCallback();

    registerSW({
      onOfflineReady() {
        dispatch('snack-bar', {
          component: 'snack-bar',
          type: 'wrap-message',
          attributes: {
            message: i18n.msg(
                'web-application-is-now-installed-and-ready-to-work-in-offline-mode-but-the-application-requires-the-internet-to-synchronize-data-with-the-server'
            ),
            align: 'bottom',
            closeButton: true,
          },
        });
      },
      onNeedRefresh() {
        dispatch('snack-bar', {
          component: 'snack-bar',
          type: 'wrap-message',
          attributes: {
            message: i18n.msg('congratulations-the-web-app-is-ready-to-update'),
            align: 'bottom',
            closeButton: true,
          },
          children: [
            {
              component: 'button',
              type: 'text',
              attributes: { slot: 'action' },
              children: [i18n.msg('update')],
            },
          ],
        });
      },
    });

    this.addSignalListener('top-app-bar-mode', (value) => {
      this.topAppBarMode = value;
    });

    this.addSignalListener('promises-list', (value) => {
      if (value.length > 0 && this.loading !== true) {
        this.loading = true;
      } else {
        this.loading = false;
      }
    });

    this.addSignalListener('top-app-bar-hidden', (hidden) => {
      this.topAppBarHidden = hidden;
    });

    this.addSignalListener('bottom-app-bar-hidden', (hidden) => {
      this.bottomAppBarHidden = hidden;
    });

    this.addSignalListener('snack-bar', (content) =>
      this.snackBarSignalListener(content)
    );

    this.addSignalListener('dialog', (content) =>
      this.dialogSignalListener(content)
    );

    this.addSignalListener('fab', (content) => this.fabSignalListener(content));
  }

  override render(): RenderResult {
    return html`
      ${this.renderTopAppBar()}

      <main role="main">
        <div class="fixed"></div>
      </main>

      ${this.renderNavigationBar(
        config.navigationTabs,
        this.bottomAppBarHidden
      )}
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

  private renderTopAppBar(): typeof nothing | M3.Components.TopAppBar {
    if (this.topAppBarHidden === true) return nothing;

    const headline = i18n.date(new Date().getTime());

    let trailing: M3.Types.DivisionContent | M3.Types.CircularProgressContent =
      {
        component: 'division',
        type: 'div',
        attributes: {
          styles: {
            display: 'flex',
            'align-content': 'center',
            'justify-content': 'center',
            width: '40px',
            height: '40px',
          },
          slot: 'trailing',
        },
        children: [
          {
            component: 'img',
            type: 'img',
            attributes: {
              src: hamiLogo,
              alt: 'gecut-logo',
              styles: {
                height: '24px',
                margin: 'auto',
              },
            },
          },
        ],
      };

    if (this.loading) {
      trailing = {
        component: 'circular-progress',
        type: 'circular-progress',
        attributes: {
          indeterminate: true,
          styles: { '--_size': '40px' },
          slot: 'trailing',
        },
      };
    }

    return M3.Renderers.renderTopAppBar({
      component: 'top-app-bar',
      type: 'center',
      attributes: {
        headline,
        mode: this.topAppBarMode,
      },
      children: [
        {
          component: 'icon-button',
          type: 'standard',
          attributes: { ariaLabel: 'Log Out', slot: 'leading' },
          iconSVG: icons.filledRounded.logout,

          transformers: (target) => {
            target.addEventListener('click', () => {
              dispatch('dialog', confirmLogoutDialog());
            });

            return target;
          },
        },
        trailing,
      ],
    });
  }

  private renderNavigationBar(
      navigationTabs: M3.Types.NavigationTabContent[],
      hidden = false
  ): RenderResult {
    this.log.methodArgs?.('renderNavigationBar', {
      navigationTabs,
      hidden,
    });

    if (hidden === true) return nothing;

    const navigationTabsTemplate = navigationTabs.map((tab) =>
      this.renderNavigationTab(tab)
    );

    return html`
      <md-navigation-bar .activeIndex=${0}>
        ${navigationTabsTemplate}
      </md-navigation-bar>
    `;
  }

  private renderNavigationTab(
      tab: M3.Types.NavigationTabContent
  ): RenderResult {
    const tabSlug = tab.link.split('/')[1];
    const activeSlug = location.pathname.split('/')[1];

    this.log.methodArgs?.('renderNavigationTab', {
      tab,
      tabSlug,
      activeSlug,
    });

    return html`
      <a class="navigation-tab" href=${tab.link}>
        <md-navigation-tab
          .label=${tab.label}
          .badgeValue=${tab.badgeValue ?? ''}
          ?active=${tabSlug === activeSlug}
          ?showBadge=${tab.showBadge}
          hideInactiveLabel
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

  private async fabSignalListener(contents: M3.Types.FABContent[]) {
    if (this.fixedDivision == null) return;

    const oldFABs = this.fixedDivision.querySelectorAll('md-fab');

    oldFABs.forEach((oldFAB) => {
      oldFAB.remove();
    });

    await new Promise<void>((resolve) => gecutAnimationFrame(() => resolve()));

    let bottom = 16;

    for (const content of contents) {
      content.attributes ??= {
        size: 'medium',
        variant: 'primary',
      };

      content.attributes['styles'] ??= {
        position: 'absolute',
        bottom: bottom + 'px',
        'inset-inline-end': '16px',
        'z-index': 'var(--sys-zindex-sticky)',
      };

      const fab = M3.Renderers.renderFAB({
        ...content,
      });

      this.fixedDivision.append(fab);

      await new Promise<void>((resolve) =>
        gecutAnimationFrame(() => resolve())
      );

      bottom += fab.getBoundingClientRect().height + 16;
    }
  }

  private snackBarSignalListener(content: M3.Types.SnackBarContent) {
    if (this.fixedDivision == null) return;

    const oldSnackBar = this.fixedDivision.querySelector('snack-bar');

    if (content.attributes?.message === oldSnackBar?.message) return;

    if (oldSnackBar != null) {
      oldSnackBar.addEventListener('closed', () => {
        this.fixedDivision?.appendChild(M3.Renderers.renderSnackBar(content));
      });

      oldSnackBar.close();
    } else {
      this.fixedDivision.appendChild(M3.Renderers.renderSnackBar(content));
    }
  }

  private dialogSignalListener(content: Signals['dialog']) {
    if (this.fixedDivision == null) return;

    if (content == null) {
      this.fixedDivision
          .querySelectorAll('md-dialog')
          .forEach((dialog) => dialog.close());

      gecutIdleCallback(() => {
        this.fixedDivision
            ?.querySelectorAll('md-dialog')
            .forEach((dialog) => dialog.close());
      });

      return;
    }

    const dialog = M3.Renderers.renderDialog(content);

    dialog.addEventListener('closed', () => {
      dialog.remove();
    });

    this.fixedDivision.appendChild(dialog);

    gecutAnimationFrame(() => {
      dialog.open = true;
    });
  }
}
