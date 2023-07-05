import '@material/web/icon/icon';
import '@material/web/textfield/filled-text-field';
import '@material/web/textfield/outlined-text-field';

import { createElementByContent } from './base/base-renderer';

import type {
  TextFieldContent,
  TextFieldRendererReturn,
} from '../types/text-field';

export function renderTextField(
  content: Partial<TextFieldContent>
): TextFieldRendererReturn {
  content.component = 'text-field';
  content.type ??= 'filled';
  content.inputType ??= 'text';

  const textField = createElementByContent(
    `md-${content.type}-text-field`,
    content
  );

  textField.type = content.inputType;

  return textField;
}
