import { request } from '@gecut/signal';
import ky from 'ky';

import config from '../config';

export const kyInstance = ky.create({
  prefixUrl: config.apiUrl,
  hooks: {
    beforeRequest: [
      (_request) => {
        const url = new URL(_request.url);
        const pathname = url.pathname.replaceAll('/', '');

        request('promises-list', {
          key: pathname,
          type: 'add',
        });
      },
    ],
    afterResponse: [
      (_request) => {
        const url = new URL(_request.url);
        const pathname = url.pathname.replaceAll('/', '');

        request('promises-list', {
          key: pathname,
          type: 'remove',
        });
      },
    ],
  },
});
