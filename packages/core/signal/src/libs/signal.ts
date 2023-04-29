import { createLogger } from '@gecut/logger';

import type { SignalsObject, SignalNonNullable, SignalListener } from '../type';

const signalsObject: SignalsObject = {};
const logger = createLogger('gecut/signal');

function __initSignal<T extends keyof Signals>(name: T) {
  signalsObject[name] ??= {
    value: undefined,
    listeners: [],
  } as SignalNonNullable<typeof name>;
}

function createSignalProvider<T extends keyof Signals>(name: T) {
  return {
    addListener: (callback: SignalListener<T>): void => {
      return addListener(name, callback);
    },
    dispatch: (value: Signals[T]): void => {
      return dispatch(name, value);
    },
  };
}

function addListener<T extends keyof Signals>(
    name: T,
    callback: SignalListener<T>
): void {
  logger.methodArgs?.('addListener', { name, callback });
  __initSignal(name);

  signalsObject[name]?.listeners.push(callback);
}

function dispatch<T extends keyof Signals>(name: T, value: Signals[T]): void {
  logger.methodArgs?.('dispatch', { name, value });
  __initSignal(name);

  (signalsObject[name] as SignalNonNullable<typeof name>).value = value;

  for (const listener of signalsObject[name]?.listeners ?? []) {
    requestAnimationFrame(() => listener(value));
  }
}

export { createSignalProvider, dispatch, addListener };
