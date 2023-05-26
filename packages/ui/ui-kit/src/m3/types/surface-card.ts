import type { BaseContent } from './base/base-content';
import type { SurfaceCard } from '../components/surface-card';

export type SurfaceCardRendererReturn = SurfaceCard;

export interface SurfaceCardContent
  extends BaseContent<SurfaceCardRendererReturn> {
  component: 'surface-card';
  type: 'elevated' | 'filled' | 'outlined';
}
