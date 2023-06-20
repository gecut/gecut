/* eslint-disable indent */
import { validator } from '@gecut/form-validator';
import { loggerElement } from '@gecut/mixins';
import { M3 } from '@gecut/ui-kit';
import { animate } from '@lit-labs/motion';
import { html, css, nothing } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { styleMap } from 'lit/directives/style-map.js';

import { Form } from './type';

import type {
  FormComponent,
  FormRow,
  FormSlide,
  FormValues,
  FormTextFieldContent,
  FormOnChange,
  FormOnSubmit,
  FormButtonContent,
} from './type';
import type { RenderResult } from '@gecut/types';
import type { PropertyDeclaration } from 'lit';

export type * from './type';

declare global {
  interface HTMLElementTagNameMap {
    'form-builder': FormBuilder;
  }
  interface HTMLElementEventMap {
    change: CustomEvent<FormOnChange>;
    submit: CustomEvent<FormOnSubmit>;
  }
}

@customElement('form-builder')
export class FormBuilder extends loggerElement {
  static override styles = [
    css`
      * {
        box-sizing: border-box;
      }

      :host {
        --gap: calc(1.5 * var(--sys-spacing-track, 8px));
        --row-gap: var(--gap);
        --column-gap: var(--gap);
        --padding-side: var(--gap);

        display: flex;
      }

      .slides {
        display: flex;

        flex: 1 0 auto;

        width: max-content;
        min-width: 100%;
      }

      .slides .slide {
        display: flex;
        flex-direction: column;

        flex: 1 1 auto;

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

  @state()
  private disableSubmitButtons = false;

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

    if (this.data == null || this.activeSlide == null) return nothing;

    const slidesSize = Object.keys(this.data.slides).length;
    const activeSlideIndex = Object.keys(this.data.slides).indexOf(
      this.activeSlide
    );

    if (activeSlideIndex === -1) return nothing;

    const slides = Object.entries(this.data.slides).map(([name, form]) => {
      return this.renderFormSlide(name, form);
    });

    const slidesTranslate = Math.round(
      (FormBuilder.translateXDirection / slidesSize) * activeSlideIndex
    );

    return html`<div
      class="slides"
      style=${styleMap({
        width: slidesSize * 100 + '%',
        transform: `translateX(${slidesTranslate}%)`,
      })}
      ${animate({
        properties: ['transform'],
      })}
    >
      ${slides}
    </div>`;
  }

  static textFieldValidator(
    component: FormTextFieldContent
  ): FormTextFieldContent {
    if (component.component !== 'text-field') return component;

    if (component.validator != null) {
      const validatorsResult = validator(
        component.value ?? '',
        component.validator
      );

      component.errorText = validatorsResult
        .filter((result) => result.validate != true)
        .map((result) => result.errorMessage)
        .join(' • ');

      component.error = validatorsResult
        .map((result) => !result.validate)
        .reduce((p, c) => p || c, false);
    }

    return component;
  }

  private renderFormSlide(
    slideName: string,
    slideForm: FormSlide
  ): RenderResult {
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
      const textField = M3.Renderers.renderTextField({
        ...component,
        customConfig: (target) => {
          if (component.customConfig != null) {
            target = component.customConfig(target);
          }

          FormBuilder.textFieldValidator(component);

          target.error = component.error ?? false;
          target.errorText = component.errorText ?? '';

          target.addEventListener('input', (event) => {
            const _target = event.target as typeof target;

            component.value = _target.value;

            FormBuilder.textFieldValidator(component);

            _target.error = component.error ?? false;
            _target.errorText = component.errorText ?? '';

            this.onChange(event, component);
          });

          return target;
        },
      });

      return html`${textField}`;
    } else if (component.component === 'button') {
      const button = M3.Renderers.renderButton({
        ...component,
        disabled: this.getDisabledForButton(component.disabled),

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
                const detail = {
                  ev: event,
                  component,
                  form: this.data,
                  values: this.values,
                  validate: this.validate,
                };

                this.dispatchEvent(
                  new CustomEvent('submit', {
                    detail,
                  })
                );

                requestAnimationFrame(async () => {
                  this.disableSubmitButtons = true;

                  if (this.data != null && this.data.onSubmit != null) {
                    await this.data.onSubmit(detail);
                  }

                  this.disableSubmitButtons = false;
                });
              }
            }
          });

          return target;
        },
      });

      return html`${button}`;
    } else if (component.component === 'select') {
      const textField = M3.Renderers.renderSelect({
        ...component,
        customConfig: (target) => {
          if (component.customConfig != null) {
            target = component.customConfig(target);
          }

          target.addEventListener('change', (event) => {
            const _target = event.target as typeof target;

            component.value = _target.value;

            this.onChange(event, component);
          });

          return target;
        },
      });

      return html`${textField}`;
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
            .filter(
              (component) =>
                component.component === 'text-field' ||
                component.component === 'select'
            )
            .map((component) => [
              (component as M3.Types.TextFieldContent).name ?? '',
              (component as M3.Types.TextFieldContent).value ?? '',
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

  static get translateXDirection(): number {
    const dir = document.dir ?? 'ltr';

    if (dir === 'rtl') {
      return 100;
    }

    return -100;
  }

  private getDisabledForButton(
    disabled: FormButtonContent['disabled']
  ): boolean {
    if (disabled === 'auto') {
      return this.disableSubmitButtons;
    }

    if (
      typeof disabled === 'function' &&
      this.data != null &&
      this.activeSlide != null
    ) {
      return disabled(this.data, this.data.slides[this.activeSlide]);
    }

    return (disabled as boolean | undefined) ?? false;
  }

  private onChange(event: Event, component: FormComponent) {
    if (this.data != null) {
      const detail = { ev: event, component, form: this.data };

      this.dispatchEvent(
        new CustomEvent('change', {
          detail,
        })
      );

      this.data.onChange?.(detail);
    }
  }
}
