import { dispatch, getValue, setProvider } from '@gecut/signal';

import { fetchJSON } from './request-base';

import type { Projects } from '@gecut/types';

// TODO: create internal cache and reload strategy for all providers
setProvider('user', async () => {
  const user = getValue('user');

  if (user != null) {
    requestIdleCallback(async () => {
      dispatch('user', await fetchUser());
    });

    return user;
  }

  return fetchUser();
});

async function fetchUser() {
  return (
    await fetchJSON<Projects.Hami.Routes['user']>('user/', {
      method: 'get',
      searchParams: {
        uid: Number(localStorage.getItem('USER_ID')),
      },
    })
  ).data;
}
