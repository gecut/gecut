/* eslint-disable indent */
import { html, css, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { loggerElement } from '@gecut/mixins';
import { renderButton, renderTextField } from '@gecut/components';
import { validator } from '@gecut/form-validator';

import { Form } from './type';

import type { TextFieldContent } from '@gecut/components';
import type { PropertyDeclaration } from 'lit';
import type { FormComponent, FormRow, FormSlide, FormValues } from './type';
import type { RenderResult } from '@gecut/types';

export type * from './type';

declare global {
  interface HTMLElementTagNameMap {
    'form-builder': FormBuilder;
  }
  interface HTMLElementEventMap {
    change: CustomEvent<{ ev: Event; component: FormComponent; form: Form }>;
    submit: CustomEvent<{ ev: Event; component: FormComponent; form: Form }>;
  }
}

@customElement('form-builder')
export class FormBuilder extends loggerElement {
  static override styles = [
    css`
      :host {
        --gap: calc(1.5 * var(--sys-spacing-track, 8px));
        --row-gap: var(--gap);
        --column-gap: var(--gap);
        --padding-side: var(--gap);

        display: flex;
      }

      .slides {
        display: flex;

        flex-grow: 1;
        width: 100%;
      }

      .slides .slide {
        display: flex;
        flex-direction: column;

        flex-grow: 1;
        width: 100%;

        gap: var(--gap);
        row-gap: var(--column-gap);

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
    `,
  ];

  @property({ type: Object })
  data?: Form;

  @property({ type: String, attribute: 'active-slide' })
  activeSlide?: string;

  override requestUpdate(
    name?: PropertyKey | undefined,
    oldValue?: unknown,
    options?: PropertyDeclaration<unknown, unknown> | undefined
  ): void {
    super.requestUpdate(name, oldValue, options);

    if (name === 'data' && oldValue == null && this.data != null) {
      this.activeSlide = Object.keys(this.data.slides)[0];
    }

    if (
      name === 'activeSlide' &&
      this.data != null &&
      this.activeSlide != null &&
      this.data.slides[this.activeSlide] == null
    ) {
      this.log.error(
        'requestUpdate',
        'active_slide_invalid',
        `'${this.activeSlide}' not exists in ${Object.keys(this.data.slides)}`
      );
    }
  }

  override render(): RenderResult {
    super.render();

    if (this.data == null) return nothing;

    const slides = Object.entries(this.data.slides).map(([name, form]) => {
      return this.renderFormSlide(name, form);
    });

    return html`<div class="slides">${slides}</div>`;
  }

  private renderFormSlide(
    slideName: string,
    slideForm: FormSlide
  ): RenderResult {
    if (slideName !== this.activeSlide) return nothing;

    const slideRowsTemplate = slideForm.map((row) => this.renderRow(row));

    return html`<div class="slide ${slideName}">${slideRowsTemplate}</div>`;
  }

  private renderRow(row: FormRow): RenderResult {
    if (Array.isArray(row)) {
      const rowTemplate = row.map((component) =>
        this.renderComponents(component)
      );

      return html`<div class="row">${rowTemplate}</div>`;
    }

    return this.renderComponents(row);
  }

  private renderComponents(component: FormComponent): RenderResult {
    if (component.component === 'text-field') {
      const textField = renderTextField({
        ...component,
        customConfig: (target) => {
          if (component.customConfig != null) {
            target = component.customConfig(target);
          }

          target.addEventListener('input', (event) => {
            const _target = event.target as typeof target;

            component.value = _target.value;

            if (component.validator != null) {
              const validatorsResult = validator(
                _target.value,
                component.validator
              );

              component.errorText = validatorsResult
                .filter((result) => result.validate != true)
                .map((result) => result.errorMessage)
                .join(' • ');

              _target.errorText = component.errorText;

              component.error = validatorsResult
                .map((result) => !result.validate)
                .reduce((p, c) => p || c, false);

              _target.error = component.error;
            }

            if (this.data != null) {
              this.dispatchEvent(
                new CustomEvent('change', {
                  detail: { ev: event, component, form: this.data },
                })
              );
            }
          });

          return target;
        },
      });

      return html`${textField}`;
    }

    if (component.component === 'button') {
      const button = renderButton({
        ...component,
        customConfig: (target) => {
          if (component.customConfig != null) {
            target = component.customConfig(target);
          }

          target.addEventListener('click', (event) => {
            // move slide

            const slideNames = Object.keys(this.data?.slides ?? {});

            if (component.action != null && this.activeSlide != null) {
              const nextSlide =
                slideNames[slideNames.indexOf(this.activeSlide) + 1];
              const previousSlide =
                slideNames[slideNames.indexOf(this.activeSlide) - 1];

              if (component.action === 'next_slide' && nextSlide != null) {
                this.activeSlide = nextSlide;
              } else if (
                component.action === 'previous_slide' &&
                previousSlide != null
              ) {
                this.activeSlide = previousSlide;
              } else if (
                component.action === 'form_submit' &&
                this.data != null
              ) {
                this.dispatchEvent(
                  new CustomEvent('submit', {
                    detail: {
                      ev: event,
                      component,
                      form: this.data,
                      values: this.values,
                      validate: this.validate,
                    },
                  })
                );
              }
            }
          });

          return target;
        },
      });

      return html`${button}`;
    }

    return nothing;
  }

  get values(): FormValues<(typeof this)['data']> | undefined {
    if (this.data?.slides == null) return undefined;

    const formValues = Object.entries(this.data.slides).map(
      ([slideName, slideForm]) => {
        const formRowsValues = slideForm.map((row) => {
          const rowValues = [row]
            .flat()
            .filter((component) => component.component === 'text-field')
            .map((component) => [
              (component as TextFieldContent).name ?? '',
              (component as TextFieldContent).value ?? '',
            ]);

          return rowValues;
        });

        return [slideName, Object.fromEntries(formRowsValues.flat())];
      }
    );

    return Object.fromEntries(formValues);
  }

  get validate(): boolean {
    return !Object.values(this.data?.slides ?? {})
      .map((formSlide) =>
        formSlide.flat().map((component) => {
          if (component.component === 'text-field') {
            return component.error ?? false;
          }

          return false;
        })
      )
      .flat()
      .reduce((p, c) => p || c, false);
  }
}
