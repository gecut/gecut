import { html, unsafeCSS } from 'lit';
import { customElement } from 'lit/decorators.js';
import { loggerElement } from '@gecut/mixins';
import iconifyComponentStyles from '@gecut/common/styles/iconify-component.css?inline';

import styles from './app.element.css?inline';

import '~icons/material-symbols/mic-rounded';

import type { RenderResult } from '@gecut/types';

declare global {
  interface HTMLElementTagNameMap {
    'app-root': AppRoot;
  }
}

@customElement('app-root')
export class AppRoot extends loggerElement {
  static override styles = [
    unsafeCSS(styles),
    unsafeCSS(iconifyComponentStyles),
  ];

  override render(): RenderResult {
    return html`
      <g-material-symbols-mic-rounded></g-material-symbols-mic-rounded>

      <h1>Lighter, Secondary Text</h1>
      <p>
        The small element is used to create a lighter, secondary text in any
        heading:
      </p>
      <h1>h1 heading <small>secondary text</small></h1>
      <h2>h2 heading <small>secondary text</small></h2>
      <h3>h3 heading <small>secondary text</small></h3>
      <h4>h4 heading <small>secondary text</small></h4>
      <h5>h5 heading <small>secondary text</small></h5>
      <h6>h6 heading <small>secondary text</small></h6>
    `;
  }
}
