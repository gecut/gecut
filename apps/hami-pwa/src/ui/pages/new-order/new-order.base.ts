import { PageBase } from '#hami/ui/helpers/page-base';

import { unsafeCSS } from 'lit';
import { property } from 'lit/decorators.js';

import styles from './new-order.scss?inline';

import type { ArrayValues } from '@gecut/types';

export const stateList = [
  'customers',
  'projects',
  'products',
  'quantities',
  'date',
  'review',
] as const;

export type States = ArrayValues<typeof stateList>;

export class NewOrderBase<T> extends PageBase<T> {
  static override styles = [unsafeCSS(styles), ...PageBase.styles];

  @property({ type: String, reflect: true })
    state: States = 'customers';
}
