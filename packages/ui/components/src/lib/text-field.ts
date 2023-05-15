import '@material/web/icon/icon';
import '@material/web/textfield/filled-text-field';
import '@material/web/textfield/outlined-text-field';

import type { TextFieldContent } from '../types/text-field';
import type { MdFilledTextField } from '@material/web/textfield/filled-text-field';
import type { MdOutlinedTextField } from '@material/web/textfield/outlined-text-field';

const textFieldKeys = [
  'label',
  'placeholder',
  'supportingText',
  'textDirection',
  'value',
  'defaultValue',
  'role',
  'required',
  'pattern',
  'errorText',
  'error',
  'prefixText',
  'suffixText',
  'max',
  'maxLength',
  'min',
  'minLength',
  'step',
  'disabled',
  'readOnly',
  'hasLeadingIcon',
  'hasTrailingIcon',
] as const;

type renderTextFieldReturnType = MdFilledTextField | MdOutlinedTextField;

export function renderTextField(
  content: TextFieldContent
): renderTextFieldReturnType {
  let textField = document.createElement(`md-${content.type}-text-field`);

  textField.type = content.inputType;
  textField.name = content.name;

  for (const key of textFieldKeys) {
    const value: (typeof textField)[typeof key] = content[key];

    if (value != null) {
      textField[key] = value as never;
    }
  }

  if (content.customConfig != null) {
    textField = content.customConfig(textField);
  }

  // TODO: use slot content for leadingicon & trailingicon

  if (content.leadingIconSVG != null) {
    const leadingIcon = document.createElement('md-icon');

    leadingIcon.innerHTML = content.leadingIconSVG;
    leadingIcon.slot = 'leadingicon';

    textField.appendChild(leadingIcon);
  }

  if (content.trailingIconSVG != null) {
    const trailingIcon = document.createElement('md-icon');

    trailingIcon.innerHTML = content.trailingIconSVG;
    trailingIcon.slot = 'trailingicon';

    textField.appendChild(trailingIcon);
  }

  textField.classList.add(...(content.classes ?? []));

  return textField;
}
