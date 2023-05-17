import type { ButtonContent } from './button';
import type { CircularProgressContent } from './circular-progress';
import type { IconContent } from './icon';
import type { IconButtonContent } from './icon-button';
import type { ListItemContent } from './list-item';
// import type { NavigationTabContent } from './navigation-tab';
import type { TextFieldContent } from './text-field';
import type { TopAppBarContent } from './top-app-bar';

export type * from './button';
export type * from './circular-progress';
export type * from './custom-config-function';
export type * from './icon';
export type * from './icon-button';
export type * from './list-item';
export type * from './navigation-tab';
export type * from './text-field';
export type * from './top-app-bar';

export type SlotsComponentsContent =
  | ButtonContent
  | IconContent
  | IconButtonContent
  | CircularProgressContent
  | ListItemContent;

export type AllComponentsContent =
  | ButtonContent
  | IconContent
  | IconButtonContent
  | CircularProgressContent
  | ListItemContent
  | TextFieldContent
  | TopAppBarContent;
