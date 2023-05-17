import type { BaseContent } from './base/base-content';
import type { MdIcon } from '@material/web/icon/icon';

export type IconRendererReturn = MdIcon;

export interface IconContent extends BaseContent<IconRendererReturn, never>{
  component: 'icon';
  type: 'svg';

  SVG: string;
};
