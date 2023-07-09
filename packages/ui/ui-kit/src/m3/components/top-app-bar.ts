import { loggerElement } from '@gecut/mixins';
import '@material/web/elevation/elevation';
import { html, nothing, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import type { RenderResult } from '@gecut/types';

declare global {
  interface HTMLElementTagNameMap {
    'top-app-bar': TopAppBar;
  }
}

@customElement('top-app-bar')
export class TopAppBar extends loggerElement {
  static override styles = [
    css`
      :host {
        display: block;
        flex-grow: 0;
        flex-shrink: 0;
        padding: var(--sys-spacing-track);
        z-index: var(--sys-zindex-sticky);
        border-radius: 0;
        user-select: none;
        background-color: var(--md-sys-color-surface);
        position: relative;
        transition-property: background-color;
        transition-duration: var(--sys-motion-duration-small);
        transition-timing-function: var(--sys-motion-easing-in-out);
        will-change: background-color;
      }

      md-elevation {
        --_level: 0;
      }

      :host([mode='on-scroll']) {
        background-color: var(--md-sys-color-surface-container);
      }
      :host([mode='on-scroll']) md-elevation {
        --_level: 2;
      }

      .row {
        display: flex;
      }

      .title {
        flex-grow: 1;
      }

      :host([type='small']) .title,
      :host([type='center']) .title {
        padding: 0 var(--sys-spacing-track);
        font-family: var(--md-sys-typescale-title-medium-font-family-name);
        font-weight: var(--md-sys-typescale-title-medium-font-weight);
        font-size: var(--md-sys-typescale-title-medium-font-size);
        letter-spacing: var(--md-sys-typescale-title-medium-letter-spacing);
        /* line-height: var(--md-sys-typescale-title-large-line-height); */
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
        overflow: clip;
        opacity: 0.7;
      }

      :host([type='small']) .title {
        justify-content: start;
      }

      /* md-standard-icon-button {
        margin: calc(var(--sys-spacing-track) / 2);
      } */

      .leading,
      .trailing,
      .title {
        display: flex;
        align-items: center;
        justify-content: center;

        height: calc(6 * var(--sys-spacing-track));
      }

      .headline {
        /* medium | large */
        display: none;
      }

      :host([type='medium']) {
        padding-bottom: calc(3 * var(--sys-spacing-track));
      }
      :host([type='large']) {
        padding-bottom: calc(3.5 * var(--sys-spacing-track));
      }

      :host([type='medium']) .headline,
      :host([type='large']) .headline {
        display: block;
        padding: 0 calc(1.5 * var(--sys-spacing-track));
      }

      :host([type='medium']) .headline {
        font-family: var(--md-sys-typescale-headline-small-font-family-name);
        font-weight: var(--md-sys-typescale-headline-small-font-weight);
        font-size: var(--md-sys-typescale-headline-small-font-size);
        letter-spacing: var(--md-sys-typescale-headline-small-letter-spacing);
        line-height: var(--md-sys-typescale-headline-small-line-height);
      }

      :host([type='large']) .headline {
        margin-top: calc(4 * var(--sys-spacing-track));
        font-family: var(--md-sys-typescale-headline-medium-font-family-name);
        font-weight: var(--md-sys-typescale-headline-medium-font-weight);
        font-size: var(--md-sys-typescale-headline-medium-font-size);
        letter-spacing: var(--md-sys-typescale-headline-medium-letter-spacing);
        line-height: var(--md-sys-typescale-headline-medium-line-height);
      }
    `,
  ];

  @property({ type: String })
    headline = '';

  @property({ type: String, reflect: true })
    mode: 'flat' | 'on-scroll' = 'flat';

  @property({ type: String, reflect: true })
    type: 'center' | 'small' | 'medium' | 'large' = 'small';

  override render(): RenderResult {
    const headline = this.headline;
    const headlineTemplate =
      this.type === 'medium' || this.type === 'large' ? headline : nothing;
    const titleTemplate =
      this.type === 'center' || this.type === 'small' ? headline : nothing;

    return html`
      <div class="row">
        <div class="leading">
          <slot name="leading"></slot>
        </div>

        <div class="title">${titleTemplate}</div>

        <div class="trailing">
          <slot name="trailing"></slot>
        </div>
      </div>

      <div class="headline">${headlineTemplate}</div>

      <md-elevation></md-elevation>
    `;
  }
}
