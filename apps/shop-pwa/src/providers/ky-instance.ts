import ky from 'ky';

import config from '../config';

export const kyInstance = ky.create({
  method: 'get',
  headers: {
    'content-type': 'application/json',
  },
  retry: {
    limit: 10,
  },
  prefixUrl: config.apiUrl,
});
