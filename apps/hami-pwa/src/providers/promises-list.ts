import { createSignalProvider } from '@gecut/signal';

const promisesListSignal = createSignalProvider('promises-list');

promisesListSignal.setProvider((promiseItem) => {
  const oldValue = promisesListSignal.value ?? [];

  if (promiseItem.type == 'remove' && oldValue != null) {
    return oldValue.filter((_promiseKey) => _promiseKey !== promiseItem.key);
  }

  if (oldValue != null && oldValue.includes(promiseItem.key) === false) {
    return [...(oldValue ?? []), promiseItem.key];
  }

  return oldValue ?? [];
});
