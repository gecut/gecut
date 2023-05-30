import config from '#hami/config';
import { getByErrorCode } from '#hami/controllers/api-server-error-message';

import { dispatch, request } from '@gecut/signal';
import ky from 'ky';

import type { AlwatrServiceResponseFailed } from '@alwatr/type';
import type { StringifyableRecord } from '@gecut/types';
import type { Options, ResponsePromise } from 'ky';

const convertUrlToKey = (url: string): string => {
  const _url = new URL(url);

  return _url.href
    .replace(config.apiUrl, '')
    .replace(_url.search, '')
    .replaceAll('/', '-');
};

export const requestBase = ky.create({
  prefixUrl: config.apiUrl,
  cache: 'reload',
  hooks: {
    beforeRequest: [
      (_request) => {
        request('promises-list', {
          key: convertUrlToKey(_request.url),
          type: 'add',
        });
      },
    ],
    afterResponse: [
      (_request) => {
        request('promises-list', {
          key: convertUrlToKey(_request.url),
          type: 'remove',
        });
      },
    ],
  },
  retry: {
    limit: 2,
  },
});

const requestBaseGET = requestBase.extend({
  headers: {
    Authorization: `Bearer ${localStorage.getItem('USER_TOKEN')}`,
  },
});

export async function fetchJSON<TJson extends StringifyableRecord>(
  url: string,
  options?: Options | undefined
): Promise<TJson> {
  const response: ResponsePromise = await requestBaseGET(url, options).catch(
    async (error) => {
      let message = getByErrorCode('');

      if (error != null && error.response != null) {
        const response =
          (await error.response.json()) as AlwatrServiceResponseFailed;

        message = getByErrorCode(response.errorCode);
      }

      dispatch('snack-bar', {
        component: 'snack-bar',
        type: 'ellipsis-message',
        message: getByErrorCode(message),
        closeButton: true,
      });

      return error;
    }
  );

  return await response.json<TJson>();
}
