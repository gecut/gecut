import i18n from '@gecut/i18n';

import type { FormSelectContent } from '@gecut/form-builder';
import type { Projects } from '@gecut/types';
import type { M3 } from '@gecut/ui-kit';

export function orderSupplierSelect(
    suppliers: Projects.Hami.Supplier[],
    supplierId?: string
): FormSelectContent {
  return {
    component: 'select',
    type: 'filled',
    attributes: {
      label: i18n.msg('supplier'),
      value: supplierId,
      name: 'supplierId',
    },
    children: [
      {
        component: 'select-option',
        type: 'select-option',
        attributes: {
          value: 'no-supplier-id',
          headline: i18n.msg('undetermined'),
        },
      },
      ...suppliers.map(
          (supplier): M3.Types.SelectOptionContent => ({
            component: 'select-option',
            type: 'select-option',
            attributes: {
              value: supplier.id,
              headline: supplier.firstName + ' ' + supplier.lastName,
            },
          })
      ),
    ],
  };
}
