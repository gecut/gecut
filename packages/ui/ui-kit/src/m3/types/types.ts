import type { ButtonContent } from './button';
import type { CircularProgressContent } from './circular-progress';
import type { DialogContent } from './dialog';
import type { IconContent } from './icon';
import type { IconButtonContent } from './icon-button';
import type { ListContent } from './list';
import type { ListItemContent } from './list-item';
import type { SnackBarContent } from './snack-bar';
import type { TextFieldContent } from './text-field';

export type * from './button';
export type * from './circular-progress';
export type * from './base/custom-config-function';
export type * from './icon';
export type * from './icon-button';
export type * from './list';
export type * from './list-item';
export type * from './navigation-tab';
export type * from './text-field';
export type * from './snack-bar';
export type * from './top-app-bar';
export type * from './dialog';

export type SlotsComponentsContent =
  | ButtonContent
  | IconContent
  | IconButtonContent
  | CircularProgressContent
  | ListItemContent
  | ListContent
  | DialogContent;

export type AllComponentsContent =
  | ButtonContent
  | IconContent
  | IconButtonContent
  | CircularProgressContent
  | ListItemContent
  | ListContent
  | DialogContent
  | TextFieldContent
  | SnackBarContent;
