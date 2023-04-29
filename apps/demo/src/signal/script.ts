import { createSignalProvider } from '@gecut/signal';

const signalTest1 = createSignalProvider('signal-test-1');
const signalTest2 = createSignalProvider('signal-test-1');

signalTest1.addListener((data) => {
  console.log(data);
});

signalTest2.setProvider((arg) => {
  return { [arg]: arg };
});

signalTest2.request('fuck');