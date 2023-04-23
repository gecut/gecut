import type { TemplateResult, nothing } from 'lit';
import type { SingleOrArray } from './type-helper';

export type RenderResult = SingleOrArray<TemplateResult> | typeof nothing;
