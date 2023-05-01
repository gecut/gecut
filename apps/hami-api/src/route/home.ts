import {nanoServer} from '../lib/server';

nanoServer.route('GET', '/', () => ({
  ok: true,
  data: {
    app: '..:: Gecut Hami API ::..',
    message: 'Hello ;)',
  },
}));
