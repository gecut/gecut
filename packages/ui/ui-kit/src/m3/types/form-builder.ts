import type { BaseContent } from './base/base-content';
import type { Form, FormBuilder } from '@gecut/form-builder';

export type FormBuilderRendererReturn = FormBuilder;

export interface FormBuilderContent
  extends BaseContent<FormBuilderRendererReturn, 'icon'> {
  component: 'form-builder';
  type: 'form-builder';

  data: Form;

  activeSlide: string;
}
