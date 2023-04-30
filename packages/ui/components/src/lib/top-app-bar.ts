import { html, nothing, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { map } from 'lit/directives/map.js';
import { when } from 'lit/directives/when.js';
import { loggerElement } from '@gecut/mixins';

import '@material/web/iconbutton/standard-icon-button';

import type { IconButtonContent, RenderResult } from '@gecut/types';

declare global {
  interface HTMLElementTagNameMap {
    'top-app-bar': TopAppBar;
  }
}

export type TopAppBarContent = {
  /**
   * @default ```'small'```
   */
  type: 'center' | 'small' | 'medium' | 'large';
  /**
   * @default ```""```
   */
  headline: string;

  leadingIcon?: IconButtonContent;
  /**
   * @default ```[]```
   */
  trailingIconList?: IconButtonContent[];
  /**
   * @default ```flat```
   */
  mode?: 'flat' | 'on-scroll';
};

@customElement('top-app-bar')
export class TopAppBar extends loggerElement {
  static override styles = [
    css`
      :host {
        display: block;
        flex-grow: 0;
        flex-shrink: 0;
        padding: var(--sys-spacing-track) calc(0.5 * var(--sys-spacing-track));
        z-index: var(--sys-zindex-sticky);
        border-radius: 0;
        user-select: none;
      }

      .row {
        display: flex;
      }

      .leading-icon {
        --comp-icon-button-color-hsl: var(--sys-color-on-surface-hsl);
      }

      .trailing-icons {
        --comp-icon-button-color-hsl: var(--sys-color-on-surface-variant-hsl);
      }

      .title {
        flex-grow: 1;
      }

      :host([type='small']) .title,
      :host([type='center']) .title {
        padding: 0 calc(0.5 * var(--sys-spacing-track));
        font-family: var(--sys-typescale-title-large-font-family-name);
        font-weight: var(--sys-typescale-title-large-font-weight);
        font-size: var(--sys-typescale-title-large-font-size);
        letter-spacing: var(--sys-typescale-title-large-letter-spacing);
        /* line-height: var(--sys-typescale-title-large-line-height); */
        line-height: calc(6 * var(--sys-spacing-track));
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
        overflow: clip;
      }

      :host([dir='rtl'][type='small']) .title,
      :host([dir='rtl'][type='center']) .title {
        line-height: calc(
          6 * var(--sys-spacing-track) - 0.18em
        ); /* 0.5 * track / title-line-height */
      }

      :host([type='center']) .title {
        text-align: center;
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
        font-family: var(--sys-typescale-headline-small-font-family-name);
        font-weight: var(--sys-typescale-headline-small-font-weight);
        font-size: var(--sys-typescale-headline-small-font-size);
        letter-spacing: var(--sys-typescale-headline-small-letter-spacing);
        line-height: var(--sys-typescale-headline-small-line-height);
      }

      :host([type='large']) .headline {
        margin-top: calc(4 * var(--sys-spacing-track));
        font-family: var(--sys-typescale-headline-medium-font-family-name);
        font-weight: var(--sys-typescale-headline-medium-font-weight);
        font-size: var(--sys-typescale-headline-medium-font-size);
        letter-spacing: var(--sys-typescale-headline-medium-letter-spacing);
        line-height: var(--sys-typescale-headline-medium-line-height);
      }
    `,
  ];

  @property({ type: Object, attribute: false })
  private content?: TopAppBarContent;

  override render(): RenderResult {
    if (this.content == null) return nothing;

    this.setAttribute('type', this.content.type);

    const headline = this.content.headline;
    const headlineTemplate =
      this.content.type === 'medium' || this.content.type === 'large'
        ? headline
        : nothing;
    const titleTemplate =
      this.content.type === 'center' || this.content.type === 'small'
        ? headline
        : nothing;

    return html`
      <div class="row">
        <div class="leading-icon">
          ${when(
            this.content != null && this.content.leadingIcon != null,
            () => html`
              <md-standard-icon-button
                href=${this.content?.leadingIcon?.href}
                target=${this.content?.leadingIcon?.target}
                ?flipIconInRtl=${this.content?.leadingIcon?.flipIconInRtl}
                ?disabled=${this.content?.leadingIcon?.disabled}
              >
                ${this.content?.leadingIcon?.icon}
              </md-standard-icon-button>
            `
          )}
        </div>

        <div class="title">${titleTemplate}</div>

        <div class="trailing-icon">
          ${map(
            this.content.trailingIconList ?? [],
            (iconContent) => html`
              <md-standard-icon-button
                href=${iconContent.href}
                target=${iconContent.target}
                ?flipIconInRtl=${iconContent.flipIconInRtl}
                ?disabled=${iconContent.disabled}
              ></md-standard-icon-button>
            `
          )}
        </div>
      </div>

      <div class="headline">${headlineTemplate}</div>
    `;
  }
}
