import { config, logger } from '../lib/config';
import { nanoServer } from '../lib/server';
import { storageClient } from '../lib/storage';
import { requireAdmin } from '../util/require-admin';

import type { AlwatrDocumentStorage } from '@alwatr/type/storage';
import type { Customer } from '@gecut/types/hami/customer';
import type { Order } from '@gecut/types/hami/order';
import type { Routes } from '@gecut/types/hami/routes';
import type { User, UserModel } from '@gecut/types/hami/user';

nanoServer.route(
  'GET',
  '/user-storage/',
  async (connection): Promise<Routes['user-storage']> => {
    logger.logMethod('get-user-storage');

    await requireAdmin(connection);

    const userStorage = await storageClient.getStorage<User>(
      config.userStorage
    );
    const customerStorage = await storageClient.getStorage<Customer>(
      config.customerStorage
    );
    const orderStorage = await storageClient.getStorage<Order>(
      config.orderStorage
    );

    for (const userId of Object.keys(userStorage.data)) {
      const user = userStorage.data[userId];

      const userModel: UserModel = {
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

    return userStorage as AlwatrDocumentStorage<UserModel>;
  }
);
