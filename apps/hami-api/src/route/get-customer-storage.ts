import {config, logger} from '../lib/config';
import {nanoServer} from '../lib/server';
import {storageClient} from '../lib/storage';
import {requireSignedIn} from '../util/require-signed-in';

import type {Customer, CustomerModel} from '@gecut/types/hami/customer';
import type {Routes} from '@gecut/types/hami/routes';
import type {User} from '@gecut/types/hami/user';
import type {Order} from '@gecut/types/hami/order';
import type {AlwatrDocumentStorage} from '@alwatr/type/storage';

nanoServer.route('GET', '/customer-storage/', async (connection): Routes['customer-storage'] => {
  logger.logMethod('get-customer-storage');

  await requireSignedIn(connection);

  const customerStorage = await storageClient.getStorage<Customer>(config.customerStorage);
  const userStorage = await storageClient.getStorage<User>(config.userStorage);
  const orderStorage = await storageClient.getStorage<Order>(config.orderStorage);

  for (const customerId of Object.keys(customerStorage.data)) {
    const customer = customerStorage.data[customerId];
    const creator = userStorage.data[customer.creatorId];
    const orderList = Object.values(orderStorage.data).filter((order) => order.customerId === customerId);

    const customerModel: CustomerModel = {
      creator,
      orderList,
      ...customer,
    };

    customerStorage[customerId] = customerModel;
  }

  return customerStorage as AlwatrDocumentStorage<CustomerModel>;
});
