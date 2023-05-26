import config from '#hami/config';

import { request } from '@gecut/signal';
import ky from 'ky';

import type { AlwatrServiceResponseFailed } from '@alwatr/type';

export const kyInstance = ky.create({
  prefixUrl: config.apiUrl,
  cache: 'default',
  hooks: {
    beforeRequest: [
      (_request) => {
        const url = new URL(_request.url);
        const pathname = url.href
          .replace(config.apiUrl, '')
          .replace(url.search, '')
          .replaceAll('/', '');

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
    beforeError: [
      async (error) => {
        const response =
          (await error.response.json()) as AlwatrServiceResponseFailed;

        console.error(response.errorCode, response.statusCode);

        return error;
      },
    ],
  },
});
