import type { SlotsComponentsContent } from './components';
import type { CustomConfigFunction } from './custom-config-function';
import type { TopAppBar } from '../lib/top-app-bar';

export type TopAppBarContent = {
  component: 'top-app-bar';

  type: 'center' | 'small' | 'medium' | 'large';

  headline: string;

  leadingSlot?: SlotsComponentsContent;

  trailingSlotList?: SlotsComponentsContent[];

  mode?: 'flat' | 'on-scroll';

  classes?: string[];

  customConfig?: CustomConfigFunction<TopAppBar>;
};
