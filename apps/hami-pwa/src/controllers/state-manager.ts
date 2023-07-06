import { logger } from './logger';

import type { ArrowFunction } from '@gecut/types';

export type StateManager<S extends string = string, T = unknown> = Record<
  S,
  ArrowFunction<T>
>;

export function stateManager<T extends StateManager, S extends keyof T>(
    states: T,
    state: S
): ReturnType<T[S]> {
  logger.methodArgs?.('stateManager', { states, state });

  return states[state]() as ReturnType<T[S]>;
}
