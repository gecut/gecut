import ky from 'ky';

import config from '../config';

export const kyInstance = ky.create({
  method: 'get',
  headers: {
    'content-type': 'application/json',
  },
  retry: {
    limit: 10,
    statusCodes: [408, 413, 429, 500, 502, 503, 504],
  },
  prefixUrl: config.apiUrl,
});
