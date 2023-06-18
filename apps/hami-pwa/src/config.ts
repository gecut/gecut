import icons from '#hami/ui/icons';

import proxyConfig from '../proxy.conf.json';

import i18n from './ui/i18n';
import { urlForName } from './ui/router';

import type { AlwatrServiceResponse } from '@alwatr/type';
import type { Projects, StringifyableRecord } from '@gecut/types';
import type { M3 } from '@gecut/ui-kit';

declare global {
  interface Signals extends Projects.Hami.Routes {
    readonly 'patch-customer-storage': Record<string, never>;
    readonly 'patch-customer-project-storage': Record<string, never>;
    readonly 'put-order': Record<string, never>;

    readonly 'top-app-bar-hidden': boolean;
    readonly 'bottom-app-bar-hidden': boolean;

    readonly user: Projects.Hami.SignInResponse;
    readonly 'search-product-price-query': string;
    readonly 'sign-in': AlwatrServiceResponse<
      Projects.Hami.SignInResponse,
      StringifyableRecord
    >;
    readonly 'top-app-bar': Partial<M3.Types.TopAppBarContent>;
    readonly 'snack-bar': M3.Types.SnackBarContent;
    readonly dialog: M3.Types.DialogContent | null;
    readonly fab: M3.Types.FABContent[];
    readonly 'promises-list': string[];
  }
  interface Providers
    extends Record<keyof Projects.Hami.Routes, Record<string, never>> {
    readonly 'patch-customer-storage': Projects.Hami.PatchRoutes['patch-customer-storage'];
    readonly 'patch-customer-project-storage': Projects.Hami.PatchRoutes['patch-customer-project-storage'];
    readonly 'put-order': Projects.Hami.PatchRoutes['put-order'];

    readonly 'sign-in': Projects.Hami.SignInRequest;
    readonly 'promises-list': {
      key: string;
      type: 'add' | 'remove';
    };
  }
}

const navigationTabs: M3.Types.NavigationTabContent[] = [
  {
    label: i18n.message('bottom_bar_home_label'),
    link: urlForName('Home'),
    icons: {
      active: icons.filledRounded.home,
      inActive: icons.outlineRounded.home,
    },
  },
  {
    label: i18n.message('bottom_bar_orders_label'),
    link: urlForName('Orders'),
    icons: {
      active: icons.filledRounded.grading,
      inActive: icons.filledRounded.grading,
    },
  },
  {
    label: i18n.message('bottom_bar_user_label'),
    link: urlForName('User'),
    icons: {
      active: icons.filledRounded.person,
      inActive: icons.outlineRounded.person,
    },
  },
  {
    label: i18n.message('bottom_bar_customers_label'),
    link: urlForName('Customers'),
    icons: {
      active: icons.filledRounded.group,
      inActive: icons.outlineRounded.group,
    },
  },
];

const config = {
  apiUrl: proxyConfig['/api/v0'].target,
  navigationTabs,
  version: '0.0.1',
};

export default config;
