import IconHomeRounded from 'virtual:icons/material-symbols/home-rounded';
import IconHomeOutlineRounded from 'virtual:icons/material-symbols/home-outline-rounded';

import type { TopAppBarContent } from '@gecut/components';
import type { NavigationTab } from '@gecut/types';

declare global {
  interface Signals {
    readonly 'top-app-bar': Partial<TopAppBarContent>;
  }
  // interface Providers {
  // }
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
