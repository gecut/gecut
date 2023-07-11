import { attachRouter } from '#persianpart/ui/router';

import { M3 } from '@gecut/ui-kit';
import { sanitizer } from '@gecut/utilities';
import { html, nothing, unsafeCSS } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import { PageBase } from '../helpers/page-base';
import icons from '../icons';

import styles from './app.element.css?inline';

import type { RenderResult } from '@gecut/types';
import type { PropertyValues } from 'lit';

declare global {
  interface HTMLElementTagNameMap {
    'app-root': AppRoot;
  }
}

@customElement('app-root')
export class AppRoot extends PageBase {
  static override styles = [...PageBase.styles, unsafeCSS(styles)];

  @property({ type: Boolean, reflect: true })
    loading = true;

  @property({ type: Boolean, reflect: true })
    scrolling = false;

  @property({ type: Boolean, reflect: true })
    fullscreen = false;

  override render(): RenderResult {
    return html`
      ${this.topAppBar}
      <main role="main"></main>
    `;
  }

  override firstUpdated(changedProperties: PropertyValues<this>): void {
    super.firstUpdated(changedProperties);

    attachRouter(this.renderRoot.querySelector('main'));

    this.addSignalListener('headline', () => {
      this.requestUpdate();
    });

    window.addEventListener('vaadin-router-location-changed', () =>
      this.requestUpdate()
    );
  }

  private get topAppBar(): typeof nothing | M3.Components.TopAppBar {
    if (this.fullscreen === true) return nothing;

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
              src: '',
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
        headline: sanitizer.str(this.headline),
        mode: this.scrolling === true ? 'on-scroll' : 'flat',
      },
      children: [
        {
          component: 'icon-button',
          type: 'standard',
          attributes: { ariaLabel: 'Log Out', slot: 'leading' },
          iconSVG: icons.filledRounded.logout,
        },
        trailing,
      ],
    });
  }
}
