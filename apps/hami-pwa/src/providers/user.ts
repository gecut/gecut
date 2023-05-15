import { dispatch, getValue, setProvider } from '@gecut/signal';

import { kyInstance } from './request-base';

import type { Projects } from '@gecut/types';

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
    await kyInstance
      .get('user/', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('USER_TOKEN')}`,
        },
        searchParams: {
          uid: Number(localStorage.getItem('USER_ID')),
        },
      })
      .json<Projects.Hami.Routes['user']>()
  ).data;
}
