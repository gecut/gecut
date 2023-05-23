import { config, logger } from '../lib/config';
import { nanoServer } from '../lib/server';
import { storageClient } from '../lib/storage';
import { requireSignedIn } from '../util/require-signed-in';

import type { AlwatrDocumentStorage } from '@alwatr/type/storage';
import type { Projects } from '@gecut/types';

nanoServer.route(
  'GET',
  '/customer-storage/',
  async (connection): Promise<Projects.Hami.Routes['customer-storage']> => {
    logger.logMethod('get-customer-storage');

    await requireSignedIn(connection);

    const customerStorage =
      await storageClient.getStorage<Projects.Hami.Customer>(
        config.customerStorage
      );
    const userStorage = await storageClient.getStorage<Projects.Hami.User>(
      config.userStorage
    );

    for await (const customerId of Object.keys(customerStorage.data)) {
      const customer = customerStorage.data[customerId];
      const creator = userStorage.data[customer.creatorId];
      const customerOrderStorage = await storageClient.getStorage<Projects.Hami.Order>(
        config.orderStoragePrefix + creator.id
      );
      const orderList = Object.values(customerOrderStorage.data).filter(
        (order) => order.customerId === customerId
      );
      const customerProjectStorage =
        await storageClient.getStorage<Projects.Hami.CustomerProject>(
          config.customerProjectStoragePrefix + customerId
        );

      delete creator['password'];
      const customerModel: Projects.Hami.CustomerModel = {
        creator,
        orderList,
        projectList: Object.values(customerProjectStorage.data),
        ...customer,
      };

      customerStorage[customerId] = customerModel;
    }

    return customerStorage as AlwatrDocumentStorage<Projects.Hami.CustomerModel>;
  }
);
