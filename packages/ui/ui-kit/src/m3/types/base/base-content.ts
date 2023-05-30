import type { CustomConfigFunction, AllComponentsContent } from '../types';

export interface BaseContent<
  TCustomConfig extends HTMLElement,
  TSlot = string,
  TSlotList = string | (AllComponentsContent & { slot?: TSlot })
> {
  hidden?: boolean;
  slot?: string;
  slotList?: TSlotList[];
  classes?: string[];
  customConfig?: CustomConfigFunction<TCustomConfig>;
}
