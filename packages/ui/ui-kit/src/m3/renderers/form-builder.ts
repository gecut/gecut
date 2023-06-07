import '@gecut/form-builder';

import { createElementByContent } from './base/base-renderer';

import type {
  FormBuilderRendererReturn,
  FormBuilderContent,
} from '../types/form-builder';

export function renderFormBuilder(
  content: FormBuilderContent
): FormBuilderRendererReturn {
  return createElementByContent('form-builder', content, [
    'activeSlide',
    'data',
  ]);
}
