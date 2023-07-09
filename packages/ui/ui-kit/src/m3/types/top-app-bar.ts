import type { BaseContent } from './base/base-content';
import type { TopAppBar } from '../components/top-app-bar';

export type TopAppBarRendererReturn = TopAppBar;

export interface TopAppBarContent
  extends BaseContent<
    TopAppBarRendererReturn,
    {
      headline: string;

      mode?: 'flat' | 'on-scroll';
    }
  > {
  component: 'top-app-bar';
  type: 'center' | 'small' | 'medium' | 'large';
}
