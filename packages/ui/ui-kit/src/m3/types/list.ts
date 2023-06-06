import type { BaseContent } from './base/base-content';
import type { MdList } from '@material/web/list/list';

export type ListRendererReturn = MdList;

export interface ListContent extends BaseContent<ListRendererReturn> {
  component: 'list';
  type: 'list';

  /**
   * The tabindex of the underlying list.
   */
  listTabIndex?: number;
  listRoot?: HTMLElement;
}
