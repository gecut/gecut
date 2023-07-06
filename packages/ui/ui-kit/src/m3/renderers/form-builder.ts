import '@gecut/form-builder';

import { createElementByContent } from './base/base-renderer';

import type {
  FormBuilderRendererReturn,
  FormBuilderContent,
} from '../types/form-builder';

export function renderFormBuilder(
    content: Partial<FormBuilderContent>
): FormBuilderRendererReturn {
  content.component = 'form-builder';
  content.type = 'form-builder';

  return createElementByContent('form-builder', content);
}
