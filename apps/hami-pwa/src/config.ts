import IconHomeRounded from 'virtual:icons/material-symbols/home-rounded';
import IconHomeOutlineRounded from 'virtual:icons/material-symbols/home-outline-rounded';

import proxyConfig from '../proxy.conf.json';

import type { SignInRequest, SignInResponse } from '@gecut/types/hami/user';
import type { TopAppBarContent } from '@gecut/components';
import type { NavigationTab } from '@gecut/types';
import type { Routes } from '@gecut/types/hami/routes';

declare global {
  interface Signals extends Routes {
    readonly 'top-app-bar-hidden': boolean;
    readonly 'bottom-app-bar-hidden': boolean;

    readonly user: SignInResponse;
    readonly 'sign-in': Record<string, never>;
    readonly 'top-app-bar': Partial<TopAppBarContent>;
    readonly 'promises-list': string[];
  }
  interface Providers extends Record<keyof Routes, Record<string, never>> {
    readonly 'sign-in': SignInRequest;
    readonly 'promises-list': {
      key: string;
      type: 'add' | 'remove';
    };
  }
}

const navigationTabs: NavigationTab[] = [
  {
    label: 'Home',
    link: '/home',
    icons: {
      active: IconHomeRounded,
      inActive: IconHomeOutlineRounded,
    },
  },
];

const config = {
  apiUrl: proxyConfig['/api/v0'].target,
  navigationTabs,
};

export default config;
