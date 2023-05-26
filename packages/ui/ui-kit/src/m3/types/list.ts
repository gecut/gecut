import type { BaseContent } from './base/base-content';
import type { MdList } from '@material/web/list/list';
import type { ARIARole } from '@material/web/types/aria';

export type ListRendererReturn = MdList;

export interface ListContent extends BaseContent<ListRendererReturn> {
  component: 'list';
  type: ARIARole | '';

  /**
   * The tabindex of the underlying list.
   */
  listTabIndex?: number;
  listRoot?: HTMLElement;
}
