import type { CustomConfigFunction, SlotsComponentsContent } from '../types';

export interface BaseContent<
  TCustomConfig extends HTMLElement,
  TSlotList = string
> {
  slot?: string;
  slotList?: (SlotsComponentsContent & { slot?: TSlotList })[];
  classes?: string[];
  customConfig?: CustomConfigFunction<TCustomConfig>;
}
