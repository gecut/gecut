import type { AllComponentsContent } from '../types/types';

export * from './button';
export * from './circular-progress';
export * from './icon';
export * from './icon-button';
export * from './list-item';
export * from './text-field';

export function renderer(
  content: AllComponentsContent
): HTMLElement | undefined {
  console.log(content);

  return undefined;
}
