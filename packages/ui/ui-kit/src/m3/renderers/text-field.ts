import '@material/web/icon/icon';
import '@material/web/textfield/filled-text-field';
import '@material/web/textfield/outlined-text-field';

import { createElementByContent } from './base/base-renderer';

import type {
  TextFieldContent,
  TextFieldRendererReturn,
} from '../types/text-field';

export function renderTextField(
  content: TextFieldContent
): TextFieldRendererReturn {
  const textField = createElementByContent(`md-${content.type}-text-field`, content, [
    'name',
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
  ]);

  textField.type = content.inputType;

  return textField;
}
