import type { NewOrder } from '#hami/config';
import { nextPageFAB } from '#hami/content/fabs/next-page-fab';
import { previousPageFAB } from '#hami/content/fabs/previous-page-fab';
import { submitFAB } from '#hami/content/fabs/submit-page-fab';
import { enterDateValuesPage } from '#hami/content/pages/enter-date-values-page';
import { enterProductsValuesPage } from '#hami/content/pages/enter-products-values-page';
import { reviewPage } from '#hami/content/pages/review-page';
import { selectCustomerPage } from '#hami/content/pages/select-customer-page';
import { selectProductsPage } from '#hami/content/pages/select-products-page';
import { selectProjectPage } from '#hami/content/pages/select-project-page';
import type { StateManager } from '#hami/controllers/state-manager';
import { stateManager } from '#hami/controllers/state-manager';

import { dispatch } from '@gecut/signal';
import { state } from 'lit/decorators.js';

import { NewOrderBase, stateList } from './new-order.base';

import type { States } from './new-order.base';
import type { AlwatrDocumentStorage } from '@alwatr/type';
import type { Projects, RenderResult } from '@gecut/types';
import type { M3 } from '@gecut/ui-kit';
import type { PropertyDeclaration } from 'lit';

type Data = {
  customerStorage: AlwatrDocumentStorage<Projects.Hami.CustomerModel>;
  productStorage: AlwatrDocumentStorage<Projects.Hami.Product>;
  projects: Record<string, Projects.Hami.CustomerProjectModel>;
};

export class NewOrderData extends NewOrderBase<Data> {
  protected order: Partial<NewOrder> = {
    active: true,
    status: 'awaitingConfirmation',
    registrationDate: new Date().getTime(),
    evacuationDate: new Date().getTime(),
  };

  @state()
  protected customerStorage?: AlwatrDocumentStorage<Projects.Hami.CustomerModel>;

  @state()
  protected projects: Record<string, Projects.Hami.CustomerProjectModel> = {};

  @state()
  protected productStorage?: AlwatrDocumentStorage<Projects.Hami.Product>;

  @state()
  protected fabStates: StateManager<States, M3.Types.FABContent[]> = {
      customers: () => [nextPageFAB()],
      projects: () => [previousPageFAB(), nextPageFAB()],
      products: () => [previousPageFAB(), nextPageFAB()],
      quantities: () => [previousPageFAB(), nextPageFAB()],
      date: () => [previousPageFAB(), nextPageFAB()],
      review: () => [previousPageFAB(), submitFAB()],
    };

  @state()
  protected slideStates: StateManager<States, RenderResult> = {
      customers: () =>
        selectCustomerPage(
            Object.values(this.customerStorage?.data ?? {}),
            this.order
        ),
      projects: () => selectProjectPage(Object.values(this.projects), this.order),
      products: () =>
        selectProductsPage(
            Object.values(this.productStorage?.data ?? {}),
            this.order
        ),
      quantities: () =>
        enterProductsValuesPage(
            Object.values(this.productStorage?.data ?? {}),
            this.order
        ),
      date: () => enterDateValuesPage(this.order),
      review: () => {
        const customer = Object.values(this.customerStorage?.data ?? {}).find(
            (customer) => customer.id === this.order.customerId
        );
        const customerProject = customer?.projectList.find(
            (project) => project.id === this.order.customerProjectId
        );
        const productList = Object.values(this.productStorage?.data ?? {});

        return reviewPage(this.order, customer, customerProject, productList);
      },
    };

  override connectedCallback(): void {
    super.connectedCallback();

    this.addSignalListener('new-order-state', (state) => {
      if (state === 'next') {
        this.setState(this.getNextState(this.state));
      } else if (state === 'previous') {
        this.setState(this.getPreviousState(this.state));
      } else if (stateList.includes(state) === true) {
        this.setState(state);
      }
    });

    this.addSignalListener('new-order', (order) => {
      const oldCustomer = this.order.customerId;

      this.order = {
        ...this.order,
        ...order,
      };

      dispatch('order', this.order as Projects.Hami.Order);

      const newCustomer = this.order.customerId;

      if (
        this.customerStorage?.data != null &&
        this.order.customerId != null &&
        newCustomer !== oldCustomer
      ) {
        this.projects = Object.fromEntries(
            this.customerStorage.data[this.order.customerId].projectList.map(
                (project) => [project.id, project]
            )
        );
      }

      if (order.registrationDate != null || order.evacuationDate != null) {
        this.requestUpdate('order');
      }
    });

    this.setDataListener({
      'customer-storage': 'customerStorage',
      'product-storage': 'productStorage',
    });
    this.requestData({
      'customer-storage': {},
      'product-storage': {},
    });
  }

  override requestUpdate(
      name?: PropertyKey | undefined,
      oldValue?: unknown,
      options?: PropertyDeclaration<unknown, unknown> | undefined
  ): void {
    super.requestUpdate(name, oldValue, options);

    if (
      (name === 'state' || name === 'fabStates') &&
      this.state != null &&
      this.fabStates != null
    ) {
      this.updateFab();
    }
  }

  protected updateFab(): void {
    if (this.fabStates == null || this.state == null) {
      return this.log.warning(
          'updateFab',
          'not_exists',
          'fab_states_or_state_not_exists',
          {
            stateName: this.state,
            fabStates: this.fabStates,
          }
      );
    }

    const stateValue = stateManager(this.fabStates, this.state);

    this.log.methodArgs?.('updateFab', {
      stateName: this.state,
      stateValue,
      fabStates: this.fabStates,
    });

    if (stateValue.length > 0) {
      dispatch('fab', stateValue);
    }
  }

  protected getNextState(state: States): States {
    this.log.methodArgs?.('getNextState', { state });

    const index = stateList.indexOf(state);
    const nextState = stateList[index + 1];

    if (nextState == null) {
      throw this.log.warning(
          'getNextState',
          'next_state_not_exists',
        `after '${state}' state not exists any state`
      );
    }

    return nextState;
  }

  protected getPreviousState(state: States): States {
    this.log.methodArgs?.('getPreviousState', { state });

    const index = stateList.indexOf(state);
    const previousState = stateList[index - 1];

    if (previousState == null) {
      throw this.log.warning(
          'getPreviousState',
          'next_state_not_exists',
        `before '${state}' state not exists any state`
      );
    }

    return previousState;
  }

  protected setState(state: States): States {
    this.log.methodArgs?.('previousState', { state });

    if (stateList.includes(state) === true) {
      this.state = state;
    } else {
      throw this.log.warning(
          'setState',
          'state_valid',
        `stateList not have '${state}' state`
      );
    }

    return state;
  }
}
