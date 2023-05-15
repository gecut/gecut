import type { SingleOrArray } from './type-helper';
import type { TemplateResult, nothing } from 'lit';

export type RenderResult = SingleOrArray<TemplateResult> | typeof nothing;
