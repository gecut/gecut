import { html, unsafeCSS } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { loggerElement } from '@gecut/mixins';
import { map } from 'lit/directives/map.js';
import { unsafeSVG } from 'lit/directives/unsafe-svg.js';
import IconDoneRounded from 'virtual:icons/material-symbols/done-rounded';
import { dispatch } from '@gecut/signal';
import { loremIpsum } from '@gecut/lorem';
// import IconErrorOutlineRounded from 'virtual:icons/material-symbols/error-outline-rounded';
// import IconWarningOutlineRounded from 'virtual:icons/material-symbols/warning-outline-rounded';

import '@material/web/list/list';
import '@material/web/list/list-item';
import '@material/web/icon/icon';

import elementStyle from '../../stylesheets/element.scss?inline';
import pageStyle from '../../stylesheets/page.scss?inline';

import styles from './home.page.scss?inline';

import type { RenderResult } from '@gecut/types';

declare global {
  interface HTMLElementTagNameMap {
    'page-home': PageHome;
  }
}

@customElement('page-home')
export class PageHome extends loggerElement {
  static override styles = [
    unsafeCSS(styles),
    unsafeCSS(elementStyle),
    unsafeCSS(pageStyle),
  ];

  @state()
  private notifications: string[] = [
      loremIpsum({ lang: 'en', size: 4, sizeType: 'word' }),
      loremIpsum({ lang: 'en', size: 4, sizeType: 'word' }),
      loremIpsum({ lang: 'en', size: 4, sizeType: 'word' }),
      loremIpsum({ lang: 'en', size: 4, sizeType: 'word' }),
    ];

  override connectedCallback(): void {
    super.connectedCallback();

    this.addEventListener('scroll', this.topAppBarMode);
  }
  override disconnectedCallback(): void {
    super.disconnectedCallback();

    this.removeEventListener('scroll', this.topAppBarMode);
  }

  override render(): RenderResult {
    super.render();

    // ${unsafeSVG(String(IconWarningOutlineRounded))}

    // ${unsafeSVG(String(IconErrorOutlineRounded))}

    return html`
      <div class="card-box">
        <h3 class="title">Notifications</h3>

        <div class="card">
          <div class="card-scroll">
            <md-list>
              ${map(
                this.notifications,
                (notification) => html`
                  <md-list-item headline=${notification}>
                    <md-icon slot="start" class="success">
                      ${unsafeSVG(String(IconDoneRounded))}
                    </md-icon>
                  </md-list-item>
                `
              )}
            </md-list>
          </div>

          <md-elevation></md-elevation>
        </div>
      </div>
    `;
  }

  private topAppBarMode(): void {
    const scrollY = this.scrollTop;

    if (Math.floor(scrollY / 10) != 0) {
      dispatch('top-app-bar', {
        mode: 'on-scroll',
      });
    } else {
      dispatch('top-app-bar', {
        mode: 'flat',
      });
    }
  }
}
