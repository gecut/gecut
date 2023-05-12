import type { ListItemContent } from './list-item';
import type { IconContent } from './icon';
import type { IconButtonContent } from './icon-button';
import type { CircularProgressContent } from './circular-progress';
import type { ButtonContent } from './button';

export type SlotsComponentsContent =
  | ButtonContent
  | IconContent
  | IconButtonContent
  | CircularProgressContent
  | ListItemContent;

export type AllComponentsContent = SlotsComponentsContent;
