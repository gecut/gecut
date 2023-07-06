import icons from '#hami/ui/icons';

import i18n from '@gecut/i18n';
import { dispatch } from '@gecut/signal';

import { addSupplierDialog } from '../dialogs/add-supplier-dialog';

import type { M3 } from '@gecut/ui-kit';

export function newSupplierFAB(): M3.Types.FABContent {
  return {
    component: 'fab',
    type: 'fab',
    attributes: {
      size: 'medium',
      variant: 'primary',
      label: i18n.msg('new-supplier'),
    },
    children: [
      {
        component: 'icon',
        type: 'svg',
        SVG: icons.filledRounded.add,
        attributes: { slot: 'icon' },
      },
    ],
    transformers: (target) => {
      target.addEventListener('click', () => {
        dispatch('dialog', addSupplierDialog());
      });

      return target;
    },
  };
}
