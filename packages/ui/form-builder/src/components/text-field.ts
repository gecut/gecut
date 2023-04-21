import { html } from 'lit';
import { classMap } from 'lit/directives/class-map.js';
import { ifDefined } from 'lit/directives/if-defined.js';

import '@material/web/textfield/filled-text-field';
import '@material/web/textfield/outlined-text-field';

import { telValidate } from '../validators/tel';
import { emailValidate } from '../validators/email';

import type { TextField } from '@material/web/textfield/lib/text-field';
import type { RenderResult } from '@gecut/types';
import type { FormListener, Input } from '../type';

export default function textField(
    component: Input,
    listener: FormListener
): RenderResult {
  const classes = classMap({
    field: true,
    'text-field': true,
    [`${component.type}-field`]: true,
    [`${component.ui}-field`]: true,
  });

  switch (component.ui) {
    case 'filled':
      return html`
        <md-filled-text-field
          name=${component.name}
          type=${component.type}
          label=${component.label}
          class=${classes}
          placeholder=${ifDefined(component.placeholder)}
          supportingText=${ifDefined(component.supportingText)}
          textDirection=${ifDefined(component.textDirection)}
          role=${ifDefined(component.role)}
          max=${ifDefined(component.max)}
          maxLength=${ifDefined(component.maxLength)}
          min=${ifDefined(component.min)}
          minLength=${ifDefined(component.minLength)}
          value=${ifDefined(component.value)}
          defaultValue=${ifDefined(component.defaultValue)}
          errorText=${ifDefined(component.errorText)}
          prefixText=${ifDefined(component.prefixText)}
          suffixText=${ifDefined(component.suffixText)}
          pattern=${ifDefined(component.validate?.pattern)}
          step=${ifDefined(component.step)}
          ?disabled=${component.disabled ?? false}
          ?required=${component.validate?.required ?? false}
          ?readOnly=${component.readOnly ?? false}
          ?hasLeadingIcon=${component.hasLeadingIcon ?? false}
          ?hasTrailingIcon=${component.hasTrailingIcon ?? false}
          @input=${event('input', component, listener)}
          @change=${event('change', component, listener)}
        ></md-filled-text-field>
      `;
    case 'outlined':
      return html`
        <md-outlined-text-field
          name=${component.name}
          type=${component.type}
          label=${component.label}
          class=${classes}
          placeholder=${ifDefined(component.placeholder)}
          supportingText=${ifDefined(component.supportingText)}
          textDirection=${ifDefined(component.textDirection)}
          role=${ifDefined(component.role)}
          max=${ifDefined(component.max)}
          maxLength=${ifDefined(component.maxLength)}
          min=${ifDefined(component.min)}
          minLength=${ifDefined(component.minLength)}
          value=${ifDefined(component.value)}
          defaultValue=${ifDefined(component.defaultValue)}
          errorText=${ifDefined(component.errorText)}
          prefixText=${ifDefined(component.prefixText)}
          suffixText=${ifDefined(component.suffixText)}
          pattern=${ifDefined(component.validate?.pattern)}
          step=${ifDefined(component.step)}
          ?disabled=${component.disabled ?? false}
          ?required=${component.validate?.required ?? false}
          ?readOnly=${component.readOnly ?? false}
          ?hasLeadingIcon=${component.hasLeadingIcon ?? false}
          ?hasTrailingIcon=${component.hasTrailingIcon ?? false}
          @input=${event('input', component, listener)}
          @change=${event('change', component, listener)}
        ></md-outlined-text-field>
      `;
  }
}

function event(
    eventName: 'input' | 'change',
    componentData: Input,
    listener: FormListener
): (event: InputEvent) => void {
  return (event: InputEvent) => {
    textFieldValidate(componentData, event);

    const target = event.target as TextField;

    componentData.value = target.value;

    listener(componentData, eventName, event);
  };
}

function textFieldValidate(input: Input, event: InputEvent): void {
  const target = event.target as TextField;

  switch (input.type) {
    case 'tel':
      target.error = !telValidate(target.value);
      break;
    case 'email':
      target.error = !emailValidate(target.value);
      break;
  }
}
