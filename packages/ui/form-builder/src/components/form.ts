import { LitElement, html, css, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import textField from './text-field';
import button from './button';

import type { Button, Form, Input } from '../type';
import type { RenderResult } from '@gecut/types';

@customElement('form-builder')
export class FormBuilder extends LitElement {
  static override styles = [
    css`
      :host {
        --gap: 8px;
        --row-gap: var(--gap);
        --column-gap: var(--gap);
        --padding-side: var(--gap);

        display: flex;
        flex-direction: column;

        gap: var(--gap);
        column-gap: var(--column-gap);

        padding: var(--padding-side);
      }

      .row {
        gap: var(--gap);
        row-gap: var(--row-gap);

        display: flex;
      }
      .row * {
        flex-grow: 1;
      }

      .button {
        width: max-content;
        margin-top: var(--column-gap);
        margin-right: auto;
        margin-left: auto;
      }

      .grow-button {
        width: auto;
      }

      .button.start-button {
        margin-inline-start: 0;
        margin-inline-end: auto;
      }
      .button.end-button {
        margin-inline-start: auto;
        margin-inline-end: 0;
      }
    `,
  ];

  @property({ type: Object, attribute: false })
    data: Form | undefined = undefined;

  override render(): RenderResult {
    if (this.data == null) return nothing;

    const formInputs = this.data.components.map((componentRow) => {
      if (Array.isArray(componentRow)) {
        return this.renderRow(componentRow);
      } else {
        return this.renderComponent(componentRow);
      }
    });

    return html`${formInputs}`;
  }

  private renderRow(componentRows: Array<Input | Button>): RenderResult {
    return html`
      <div class="row">
        ${componentRows.map((component) => this.renderComponent(component))}
      </div>
    `;
  }

  private renderComponent(component: Input | Button): RenderResult {
    if (this.data == null) return nothing;

    switch (component.type) {
      case 'number':
        return textField(component, this.data);
      case 'email':
        return textField(component, this.data);
      case 'password':
        return textField(component, this.data);
      case 'search':
        return textField(component, this.data);
      case 'tel':
        return textField(component, this.data);
      case 'text':
        return textField(component, this.data);
      case 'url':
        return textField(component, this.data);
      case 'submit':
        return button(component, this.data);
    }
  }
}
