import type { BaseContent } from './base/base-content';
import type { LitVirtualizer } from '@lit-labs/virtualizer';
import type { LayoutConfigValue } from '@lit-labs/virtualizer/layouts/shared/Layout';
import type { RenderItemFunction } from '@lit-labs/virtualizer/virtualize';
import type { KeyFn } from 'lit/directives/repeat.js';

export type LitVirtualizerRendererReturn = LitVirtualizer;

export interface LitVirtualizerContent<T = unknown>
  extends BaseContent<LitVirtualizerRendererReturn> {
  component: 'lit-virtualizer';
  type: 'lit-virtualizer';

  /**
   * A function that returns a lit-html TemplateResult. It will be used
   * to generate the DOM for each item in the virtual list.
   */
  renderItem?: RenderItemFunction<T>;
  keyFunction?: KeyFn<T>;
  scroller?: boolean;
  layout?: LayoutConfigValue;
  /**
   * The list of items to display via the renderItem function.
   */
  items?: Array<T>;
}
