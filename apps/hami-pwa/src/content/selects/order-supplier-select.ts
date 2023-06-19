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
    label: i18n.msg('content_order_card_supplier'),
    value: supplierId,
    name: 'supplierId',
    slotList: [
      {
        component: 'select-option',
        type: 'select-option',
        value: 'no-supplier-id',
        headline: i18n.msg('content_order_card_no_supplier'),
      },
      ...suppliers.map(
        (supplier): M3.Types.SelectOptionContent => ({
          component: 'select-option',
          type: 'select-option',
          value: supplier.id,
          headline: supplier.firstName + ' ' + supplier.lastName,
        })
      ),
    ],
  };
}
