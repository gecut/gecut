import { PageBase } from '#hami/ui/helpers/page-base';

import { html } from 'lit';
import { customElement } from 'lit/decorators.js';

import type { RenderResult } from '@gecut/types';

declare global {
  interface HTMLElementTagNameMap {
    'page-home': PageHome;
  }
}

@customElement('page-home')
export class PageHome extends PageBase {
  static override styles = [];

  override render(): RenderResult {
    super.render();

    return html``;
  }
}
