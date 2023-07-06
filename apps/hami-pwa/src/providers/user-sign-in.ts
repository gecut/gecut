import { request, setProvider } from '@gecut/signal';

import { fetchJSON } from '../controllers/request-base';

import type { Projects } from '@gecut/types';

setProvider('sign-in', async (signInData) => {
  const response = await fetchJSON<Projects.Hami.Routes['sign-in']>(
      'sign-in/',
      {
        method: 'post',
        searchParams: {},
        headers: {},
        json: { data: signInData },
      }
  );

  if (response.ok === true) {
    const user = response.data;

    localStorage.setItem('USER_ID', user.id);
    localStorage.setItem('USER_TOKEN', user.token);

    request('user', {});
  }

  return response;
});
