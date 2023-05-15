import { request, setProvider } from '@gecut/signal';

import { kyInstance } from './request-base';

import type { Projects } from '@gecut/types';

setProvider('sign-in', async (signInData) => {
  const response = await kyInstance
    .post('sign-in/', {
      headers: {},
      json: { data: signInData },
    })
    .json<Projects.Hami.Routes['sign-in']>();

  if (response.ok === true) {
    const user = response.data;

    localStorage.setItem('USER_ID', user.id);
    localStorage.setItem('USER_TOKEN', user.token);

    request('user', {});
  }

  return {};
});
