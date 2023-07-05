import type { BaseContent } from './base/base-content';
import type { MdList } from '@material/web/list/list';

export type ListRendererReturn = MdList;

export interface ListContent
  extends BaseContent<
    ListRendererReturn,
    {
      /**
       * The tabindex of the underlying list.
       */
      listTabIndex?: number;
      listRoot?: HTMLElement;
    }
  > {
  component: 'list';
  type: 'list';
}
