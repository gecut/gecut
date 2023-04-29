import { createLogger } from '@gecut/logger';

import type {
  SignalsObject,
  SignalNonNullable,
  SignalListener,
  SignalProvider,
} from '../type';

const signalsObject: SignalsObject = {};
const logger = createLogger('gecut/signal');

function __initSignal<T extends keyof Signals>(name: T) {
  signalsObject[name] ??= {
    value: undefined,
    provider: undefined,
    listeners: [],
  } as SignalNonNullable<typeof name>;
}

function createSignalProvider<T extends keyof Signals>(name: T) {
  return {
    addListener: (callback: SignalListener<T>): void => {
      return addListener(name, callback);
    },
    setProvider: (provider: SignalProvider<T>): void => {
      return setProvider(name, provider);
    },
    request: async (args: Providers[T]): Promise<void> => {
      return await request(name, args);
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

function setProvider<T extends keyof Signals>(
    name: T,
    provider: SignalProvider<T>
): void {
  logger.methodArgs?.('setProvider', { name, provider });
  __initSignal(name);

  (signalsObject[name] as SignalNonNullable<typeof name>).provider = provider;
}

async function request<T extends keyof Signals>(
    name: T,
    args: Providers[T]
): Promise<void> {
  logger.methodArgs?.('request', { name, args });
  __initSignal(name);

  if (signalsObject[name]?.provider == null) {
    return logger.warning(
        'request',
        'provider_not_exists',
        'Before run request, set Provider',
        { name, args }
    );
  }

  const value = await signalsObject[name]?.provider?.(args);

  if (value == null) {
    return logger.warning(
        'request',
        'provider_return_empty',
        'Provider must be return a value, not empty',
        { name, args }
    );
  }

  dispatch(name, value);
}

export { createSignalProvider, dispatch, addListener, setProvider, request };
