import type { AllComponentsContent } from './types';

export type TopAppBarContent = {
  component: 'top-app-bar';

  type: 'center' | 'small' | 'medium' | 'large';

  headline: string;

  leadingSlot?: AllComponentsContent;

  trailingSlotList?: AllComponentsContent[];

  mode?: 'flat' | 'on-scroll';
};

// TODO: create top app bar renderer
