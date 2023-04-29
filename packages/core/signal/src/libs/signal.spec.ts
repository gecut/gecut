import { addListener, dispatch } from './signal';

describe('Signal', () => {
  test('Listener', () => {
    addListener('signal-test-1', (data) => {
      expect(data['foo']).toEqual('bar');
    });

    dispatch('signal-test-1', { foo: 'bar' });
  });
});
