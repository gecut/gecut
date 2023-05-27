import type { CustomConfigFunction, AllComponentsContent } from '../types';

export interface BaseContent<
  TCustomConfig extends HTMLElement,
  TSlotList = string
> {
  hidden?: boolean;
  slot?: string;
  slotList?: (AllComponentsContent & { slot?: TSlotList })[];
  classes?: string[];
  customConfig?: CustomConfigFunction<TCustomConfig>;
}
