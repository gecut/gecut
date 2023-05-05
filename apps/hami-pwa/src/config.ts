import IconHomeRounded from 'virtual:icons/material-symbols/home-rounded';
import IconHomeOutlineRounded from 'virtual:icons/material-symbols/home-outline-rounded';

import type { TopAppBarContent } from '@gecut/components';
import type { NavigationTab } from '@gecut/types';
import type { Routes } from '@gecut/types/hami/routes';

declare global {
  interface Signals extends Routes {
    readonly 'top-app-bar': Partial<TopAppBarContent>;
    readonly 'promises-list': string[];
  }
  interface Providers extends Record<keyof Routes, never> {
    readonly 'promises-list': {
      key: string;
      type: 'add' | 'remove';
    };
  }
}

const navigationTabs: NavigationTab[] = [
  {
    label: 'Home',
    link: '/',
    icons: {
      active: IconHomeRounded,
      inActive: IconHomeOutlineRounded,
    },
  },
];

const config = {
  apiUrl: '',
  navigationTabs,
};

export default config;
