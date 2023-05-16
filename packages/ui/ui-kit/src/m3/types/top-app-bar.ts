import type { CustomConfigFunction } from './custom-config-function';
import type { SlotsComponentsContent } from './types';
import type { TopAppBar } from '../components/top-app-bar';

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
