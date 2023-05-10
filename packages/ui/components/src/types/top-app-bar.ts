import type { SlotsComponentsContent } from './components';

export type TopAppBarContent = {
  component: 'top-app-bar';

  type: 'center' | 'small' | 'medium' | 'large';

  headline: string;

  leadingSlot?: SlotsComponentsContent;

  trailingSlotList?: SlotsComponentsContent[];

  mode?: 'flat' | 'on-scroll';
};
