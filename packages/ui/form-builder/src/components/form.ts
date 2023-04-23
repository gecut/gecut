import { html, css, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { loggerElement } from '@gecut/mixins';

import { Form } from '../type';

import textField from './text-field';
import button from './button';

import type { Button, Input } from '../type';
import type { RenderResult } from '@gecut/types';

declare global {
  interface HTMLElementTagNameMap {
    'form-builder': FormBuilder;
  }
}

@customElement('form-builder')
export class FormBuilder extends loggerElement {
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

  @property({ type: Object })
    data?: Form;

  override render(): RenderResult {
    if (this.data == null) return html`<h1>Hello</h1>`;

    const formInputs = this.data?.components.map((componentRow) => {
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

  private listener(
      componentData: Input | Button,
      eventName: 'input' | 'change' | 'click',
      event: InputEvent | PointerEvent
  ): void {
    this.log.methodArgs?.('listener', {
      eventName,
      componentData,
      event,
    });

    this.data?.listener?.(componentData, eventName, event);
  }

  private renderComponent(component: Input | Button): RenderResult {
    if (this.data == null) return nothing;

    switch (component.type) {
      case 'number':
        return textField(component, (...args) => this.listener(...args));
      case 'email':
        return textField(component, (...args) => this.listener(...args));
      case 'password':
        return textField(component, (...args) => this.listener(...args));
      case 'search':
        return textField(component, (...args) => this.listener(...args));
      case 'tel':
        return textField(component, (...args) => this.listener(...args));
      case 'text':
        return textField(component, (...args) => this.listener(...args));
      case 'url':
        return textField(component, (...args) => this.listener(...args));
      case 'submit':
        return button(component, (...args) => this.listener(...args));
    }
  }
}
