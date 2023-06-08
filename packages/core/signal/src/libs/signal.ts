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
  };
}

function createSignalProvider<T extends keyof Signals>(name: T) {
  return {
    get value() {
      return getValue(name);
    },
    addListener: (callback: SignalListener<T>): void => {
      return addListener(name, callback);
    },
    removeListener: (callback: SignalListener<T>): void => {
      return removeListener(name, callback);
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

function removeListener<T extends keyof Signals>(
  name: T,
  callback: SignalListener<T>
): void {
  logger.methodArgs?.('removeListener', { name, callback });
  __initSignal(name);

  const index = signalsObject[name]?.listeners.indexOf(callback);

  if (index != null) {
    delete signalsObject[name]?.listeners[index];
  }
}

function dispatch<T extends keyof Signals>(name: T, value: Signals[T]): void {
  logger.methodArgs?.('dispatch', { name, value });
  __initSignal(name);

  (signalsObject[name] as SignalNonNullable<typeof name>).value = value;

  for (const listener of signalsObject[name]?.listeners ?? []) {
    if (typeof listener === 'function') {
      requestAnimationFrame(() => listener(value));
    }
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

function getValue<T extends keyof Signals>(name: T): Signals[T] | undefined {
  logger.methodArgs?.('getValue', { name });
  __initSignal(name);

  return signalsObject[name]?.value;
}

async function request<T extends keyof Signals>(
  name: T,
  args: Providers[T],
  strategy: 'staleWhileRevalidate' | 'newData' = 'newData'
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

  requestAnimationFrame(async () => {
    if (strategy === 'staleWhileRevalidate') {
      const value = getValue(name);

      if (value != null) {
        dispatch(name, value);
      }
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
  });
}

export {
  createSignalProvider,
  dispatch,
  addListener,
  removeListener,
  setProvider,
  request,
  getValue,
};
