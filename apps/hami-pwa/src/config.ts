import IconHomeOutlineRounded from 'virtual:icons/material-symbols/home-outline-rounded';
import IconHomeRounded from 'virtual:icons/material-symbols/home-rounded';
import IconPersonOutlineRounded from 'virtual:icons/material-symbols/person-outline-rounded';
import IconPersonRounded from 'virtual:icons/material-symbols/person-rounded';

import proxyConfig from '../proxy.conf.json';

import i18n from './ui/i18n';
import { urlForName } from './ui/router';

import type { TopAppBarContent, NavigationTab } from '@gecut/components';
import type { Routes } from '@gecut/types/hami/routes';
import type { SignInRequest, SignInResponse } from '@gecut/types/hami/user';

declare global {
  interface Signals extends Routes {
    readonly 'top-app-bar-hidden': boolean;
    readonly 'bottom-app-bar-hidden': boolean;

    readonly user: SignInResponse;
    readonly 'search-product-price-query': string;
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
    label: i18n.message('bottom_bar_home_label'),
    link: urlForName('Home'),
    icons: {
      active: IconHomeRounded,
      inActive: IconHomeOutlineRounded,
    },
  },
  {
    label: i18n.message('bottom_bar_user_label'),
    link: urlForName('User'),
    icons: {
      active: IconPersonRounded,
      inActive: IconPersonOutlineRounded,
    },
  },
];

const config = {
  apiUrl: proxyConfig['/api/v0'].target,
  navigationTabs,
};

export default config;
