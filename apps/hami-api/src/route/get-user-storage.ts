import { config, logger } from '../lib/config';
import { nanoServer } from '../lib/server';
import { storageClient } from '../lib/storage';
import { requireAdmin } from '../util/require-admin';

import type { Projects } from '@gecut/types';

nanoServer.route(
  'GET',
  '/user-storage/',
  async (connection): Promise<Projects.Hami.Routes['user-storage']> => {
    logger.logMethod('get-user-storage');

    await requireAdmin(connection);

    const userStorage = await storageClient.getStorage<Projects.Hami.UserModel>(
      config.userStorage
    );
    const customerStorage =
      await storageClient.getStorage<Projects.Hami.Customer>(
        config.customerStorage
      );
    const orderStorage = await storageClient.getStorage<Projects.Hami.Order>(
      config.orderStorage
    );

    for (const userId of Object.keys(userStorage.data)) {
      const user = userStorage.data[userId];

      const userModel: Projects.Hami.UserModel = {
        orderList: Object.values(orderStorage.data).filter(
          (order) => order.creatorId === userId
        ),
        customerList: Object.values(customerStorage.data).filter(
          (customer) => customer.creatorId === userId
        ),

        ...user,
      };

      userStorage[userId] = userModel;
    }

    return userStorage;
  }
);
