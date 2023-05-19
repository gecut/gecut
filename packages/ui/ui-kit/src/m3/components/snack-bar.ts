import { loggerElement } from '@gecut/mixins';
import '@material/web/elevation/elevation';
import { html, nothing, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { when } from 'lit/directives/when.js';

import { renderIcon } from '../renderers/icon';

import type { IconRendererReturn } from '../types/icon';
import type { RenderResult } from '@gecut/types';
import type { PropertyValues } from 'lit';

declare global {
  interface HTMLElementTagNameMap {
    'snack-bar': SnackBar;
  }
}

@customElement('snack-bar')
export class SnackBar extends loggerElement {
  static override styles = [
    css`
      * {
        box-sizing: border-box;
      }

      :host {
        --_gap: min(calc(1.5 * var(--sys-spacing-side-padding)), 24px);
        --_in-point: 0;

        display: flex;
        flex-direction: row;
        align-items: center;
        position: absolute;

        right: var(--_gap);
        left: var(--_gap);

        background-color: var(--md-sys-color-inverse-surface, #313033);
        color: var(--md-sys-color-inverse-on-surface, #f4eff4);

        max-width: var(--sys-breakpoint-handset, 600px);
        min-height: calc(6 * var(--sys-spacing-track, 8px));
        height: min-content;
        padding-inline-start: calc(2 * var(--sys-spacing-track, 8px));
        border-radius: var(--sys-radius-xsmall, 4px);

        font-family: var(--md-sys-typescale-body-medium-font-family-name);
        font-style: var(--md-sys-typescale-body-medium-font-family-style);
        font-weight: var(--md-sys-typescale-body-medium-font-weight, 400);
        font-size: var(--md-sys-typescale-body-medium-font-size, 14px);
        letter-spacing: var(--md-sys-typescale-body-medium-tracking, 0.25px);
        line-height: var(--md-sys-typescale-body-medium-height, 20px);
        text-transform: var(--md-sys-typescale-body-medium-text-transform);
        text-decoration: var(--md-sys-typescale-body-medium-text-decoration);

        z-index: var(--sys-zindex-snackbar, 700);

        /* close state */
        opacity: 0;
        transform: translateY(var(--_in-point)) scale(0.6);
        pointer-events: none;
        transition-property: opacity, transform;
        transition-duration: var(--sys-motion-duration-medium, 400ms);
        transition-timing-function: cubic-bezier(0.6, -0.28, 0.74, 0.05);
        will-change: opacity, transform;
      }

      :host([align='top']) {
        --_in-point: -200%;
      }

      :host([align='bottom']) {
        --_in-point: 200%;
      }

      :host([opened]) {
        opacity: 1;
        transform: translateY(0px) scale(1);
        pointer-events: auto;
        transition-duration: var(--sys-motion-duration-large, 512ms);
        transition-timing-function: cubic-bezier(0.18, 0.89, 0.32, 1.27);
      }

      :host([type='wrap-message']) {
        align-items: baseline;
        padding: calc(1.5 * var(--sys-spacing-track, 8px));
        padding-bottom: calc(0.5 * var(--sys-spacing-track, 8px));
        flex-direction: column;
      }

      md-elevation {
        --_level: 3;
      }

      .message {
        flex-grow: 1;
      }
      :host([type='wrap-message']) .message {
        padding-bottom: calc(1.5 * var(--sys-spacing-track, 8px));
      }
      :host([type='ellipsis-message']) .message {
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
      }

      md-icon {
        line-height: 0;
        padding: calc(1.5 * var(--sys-spacing-track));
      }
      md-icon svg {
        color: var(--md-sys-color-inverse-on-surface, #f4eff4);
      }
    `,
  ];
  static closeIcon = `<svg height="1em" viewBox="0 96 960 960" width="1em"><path d="M480.761 630.109 275.913 834.957q-12.478 12.478-27.935 12.478-15.456 0-26.935-12.478-12.478-11.479-12.478-26.935 0-15.457 12.478-26.935l205.609-205.848L220.283 369.63q-11.479-11.478-11.479-27.054 0-15.576 11.479-27.054 11.239-11.479 26.815-11.479t28.054 11.479L480 520.609l205.087-205.326q11.478-11.479 26.935-11.479 15.456 0 27.935 11.479 11.478 12.478 11.478 28.315 0 15.837-11.478 27.315L534.87 575.761l204.847 205.848q11.718 11.717 11.718 27.174 0 15.456-11.718 26.934-11.478 11.718-27.054 11.718-15.576 0-26.054-11.718L480.761 630.109Z"/></svg>`;

  @property({ type: String, reflect: true })
    type: 'ellipsis-message' | 'wrap-message' = 'ellipsis-message';

  @property({ type: String, reflect: true })
    align: 'top' | 'bottom' = 'bottom';

  @property({ type: String, reflect: true })
    message?: string;

  @property({ type: Number, reflect: true })
    duration = 5_000;

  @property({ type: Number, reflect: true, attribute: 'start-from' })
    startFrom?: number;

  @property({ type: Boolean, reflect: true })
    closeButton = false;

  @property({ type: Boolean, reflect: true })
    opened = false;

  override render(): RenderResult {
    if (this.message == null) return nothing;

    this.style[this.align] =
      this.startFrom == null ? 'var(--_gap)' : this.startFrom + 'px';

    return html`
      <div class="message">${this.message}</div>
      ${when(this.closeButton === true, () => this.renderCloseButton())}
      <slot name="action"></slot>

      <md-elevation></md-elevation>
    `;
  }

  closeSnackBar(): void {
    this.opened = false;

    setTimeout(() => {
      requestAnimationFrame(() => {
        this.remove();
      });
    }, 400);
  }

  protected override firstUpdated(
    changedProperties: PropertyValues<this>
  ): void {
    super.firstUpdated(changedProperties);

    requestAnimationFrame(() => {
      this.opened = true;
    });

    // setTimeout(() => {
    //   this.closeSnackBar();
    // }, this.duration);
  }

  private renderCloseButton(): IconRendererReturn {
    return renderIcon({
      component: 'icon',
      type: 'svg',
      SVG: SnackBar.closeIcon,
      customConfig: (target) => {
        target.addEventListener('click', () => this.closeSnackBar());

        return target;
      },
    });
  }
}
