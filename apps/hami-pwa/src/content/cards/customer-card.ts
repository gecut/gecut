import { isFieldExits } from '#hami/controllers/is-field-exists';
import icons from '#hami/ui/icons';

import i18n from '@gecut/i18n';
import { dispatch } from '@gecut/signal';
import { join, sanitizer } from '@gecut/utilities';

import { addCustomerProjectDialog } from '../dialogs/add-customer-project-dialog';
import {
  paragraphTypographies,
  paragraphTypography,
} from '../typographies/surface-card-paragraph-typography';

import type { Projects } from '@gecut/types';
import type { M3 } from '@gecut/ui-kit';

export function customerCard(
    customer: Projects.Hami.CustomerModel
): M3.Types.SurfaceCardContent {
  return {
    component: 'surface-card',
    type: 'elevated',
    attributes: {
      styles: {
        'margin-top': 'var(--sys-spacing-track,8px)',
        'margin-bottom': 'calc(2*var(--sys-spacing-track,8px))',
        padding: 'calc(2*var(--sys-spacing-track,8px))',
        'padding-top': 'var(--sys-spacing-track,8px)',
      },
    },
    children: [
      {
        component: 'typography',
        type: 'h1',
        children: [
          join(
              ' ',
              sanitizer.str(customer.firstName),
              sanitizer.str(customer.lastName)
          ),
        ],
        attributes: {
          classes: ['surface-card__title'],
        },
      },
      ...paragraphTypographies([
        join(
            ': ',
            i18n.msg('phone-number'),
            i18n.phone(sanitizer.str(customer?.phoneNumber), true)
        ),
        join(
            ': ',
            i18n.msg('number-of-projects'),
            i18n.int(customer.projectList.length)
        ),
        join(
            ': ',
            i18n.msg('number-of-orders'),
            i18n.int(customer.orderList.length)
        ),
        join(
            '',
            i18n.msg('creator'),
            ': ',
            sanitizer.str(customer.creator?.firstName),
            ' ',
            sanitizer.str(customer.creator?.lastName)
        ),
      ]),
      paragraphTypography({
        children: [
          ': ',
          join(i18n.msg('description'), sanitizer.str(customer.description)),
        ],
        attributes: {
          hidden: isFieldExits(customer.description) === false,
        },
      }),
      {
        component: 'button',
        type: 'filled',
        attributes: {
          styles: {
            'margin-inline-start': 'auto',
            'margin-top': 'calc(2*var(--sys-spacing-track,8px))',
          },
        },
        children: [
          i18n.msg('add-project'),
          {
            component: 'icon',
            type: 'svg',
            SVG: icons.filledRounded.add,
            attributes: {
              slot: 'icon',
            },
          },
        ],
        transformers: (target) => {
          target.addEventListener('click', () => {
            dispatch('dialog', addCustomerProjectDialog(customer.id));
          });

          return target;
        },
      },
    ],
  };
}
