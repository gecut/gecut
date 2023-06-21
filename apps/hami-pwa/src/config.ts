import icons from '#hami/ui/icons';

import i18n from '@gecut/i18n';

import proxyConfig from '../proxy.conf.json';

import fa from './content/translation/fa-IR.json';
import { urlForName } from './ui/router';

import type { AlwatrServiceResponse } from '@alwatr/type';
import type { LocaleFileType } from '@gecut/i18n';
import type { Projects, StringifyableRecord } from '@gecut/types';
import type { M3 } from '@gecut/ui-kit';

i18n.register(fa as LocaleFileType);

declare global {
  interface Signals extends Projects.Hami.Routes {
    readonly 'patch-customer-project-storage': Record<string, never>;
    readonly 'patch-customer-storage': Record<string, never>;
    readonly 'patch-notification-storage': Record<string, never>;
    readonly 'patch-product-price-storage': Record<string, never>;
    readonly 'patch-product-storage': Record<string, never>;
    readonly 'patch-supplier-storage': Record<string, never>;
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
    readonly 'patch-customer-project-storage': Projects.Hami.PatchRoutes['patch-customer-project-storage'];
    readonly 'patch-customer-storage': Projects.Hami.PatchRoutes['patch-customer-storage'];
    readonly 'patch-notification-storage': Projects.Hami.PatchRoutes['patch-notification-storage'];
    readonly 'patch-product-price-storage': Projects.Hami.PatchRoutes['patch-product-price-storage'];
    readonly 'patch-product-storage': Projects.Hami.PatchRoutes['patch-product-storage'];
    readonly 'patch-supplier-storage': Projects.Hami.PatchRoutes['patch-supplier-storage'];
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
    label: i18n.msg('orders'),
    link: urlForName('Orders'),
    icons: {
      active: icons.filledRounded.grading,
      inActive: icons.filledRounded.grading,
    },
  },
  {
    label: i18n.msg('products'),
    link: urlForName('Products'),
    icons: {
      active: icons.filledRounded.category,
      inActive: icons.outlineRounded.category,
    },
  },
  {
    label: i18n.msg('home'),
    link: urlForName('Home'),
    icons: {
      active: icons.filledRounded.home,
      inActive: icons.outlineRounded.home,
    },
  },
  {
    label: i18n.msg('suppliers'),
    link: urlForName('Suppliers'),
    icons: {
      active: icons.filledRounded.supervisorAccount,
      inActive: icons.outlineRounded.supervisorAccount,
    },
  },
  {
    label: i18n.msg('customers'),
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
