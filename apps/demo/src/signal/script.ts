import { createSignalProvider } from '@gecut/signal';

const signalTest1 = createSignalProvider('signal-test-1');
const signalTest2 = createSignalProvider('signal-test-1');

signalTest1.addListener((data) => {
  console.log(data);
});

signalTest2.dispatch({ foo: 'bar' });
signalTest2.dispatch({ bar: 'foo' });
