import { createSignalProvider } from '@gecut/signal';

const promisesListSignal = createSignalProvider('promises-list');

promisesListSignal.setProvider((promiseItem) => {
  if (promiseItem.type == 'remove') {
    return [];
  }

  return [...(promisesListSignal.value ?? []), promiseItem.key];
});
