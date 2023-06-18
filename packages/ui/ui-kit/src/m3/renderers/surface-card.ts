import '../components/surface-card';

import { createElementByContent } from './base/base-renderer';

import type {
  SurfaceCardContent,
  SurfaceCardRendererReturn,
} from '../types/surface-card';

export function renderSurfaceCard(
  content: SurfaceCardContent,
): SurfaceCardRendererReturn {
  const card = createElementByContent('surface-card', content, ['type']);

  return card;
}
