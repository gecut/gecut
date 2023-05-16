import type { CustomConfigFunction } from './custom-config-function';
import type { MdIcon } from '@material/web/icon/icon';

export type IconContent = {
  component: 'icon';
  type: 'svg';

  SVG: string;
  slot?: string;

  classes?: string[];

  customConfig?: CustomConfigFunction<MdIcon>;
};
