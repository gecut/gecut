import { createSignalProvider } from '@gecut/signal';

const promisesListSignal = createSignalProvider('promises-list');

promisesListSignal.setProvider((promiseItem) => {
  if (
    promiseItem.type == 'remove' &&
    promisesListSignal.value != null &&
    promisesListSignal.value.length > 0
  ) {
    return promisesListSignal.value.filter(
      (_promiseKey) => _promiseKey !== promiseItem.key
    );
  }

  return [...(promisesListSignal.value ?? []), promiseItem.key];
});
