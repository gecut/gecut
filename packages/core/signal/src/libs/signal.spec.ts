import { addListener, dispatch, setProvider, request } from './signal';

describe('Signal', () => {
  test('Listener', () => {
    addListener('signal-test-1', (data) => {
      expect(data['foo']).toEqual('bar');
    });

    dispatch('signal-test-1', { foo: 'bar' });
  });

  test('Provider', () => {
    addListener('signal-test-1', (data) => {
      expect(data['foo']).toEqual('foo');
    });

    setProvider('signal-test-1', (arg) => {
      return { [arg]: arg };
    });

    request('signal-test-1', 'foo');
  });
});
