import { config, logger } from '../lib/config';
import { nanoServer } from '../lib/server';
import { storageClient } from '../lib/storage';
import { requireSignedIn } from '../util/require-signed-in';

import type { Projects } from '@gecut/types';

nanoServer.route(
  'GET',
  '/order-storage/',
  async (connection): Promise<Projects.Hami.Routes['order-storage']> => {
    logger.logMethod?.('get-order-storage');

    const user = await requireSignedIn(connection);
    const orderStorage =
      await storageClient.getStorage<Projects.Hami.OrderModel>(
        config.orderStorage
      );

    for await (const orderId of Object.keys(orderStorage.data)) {
      const order = orderStorage.data[orderId];
      console.log(order);

      const creator = await storageClient.get<Projects.Hami.User>(
        order.creatorId,
        config.userStorage
      );
      const customer = await storageClient.get<Projects.Hami.Customer>(
        order.customerId,
        config.customerStorage
      );
      const customerProject =
        await storageClient.get<Projects.Hami.CustomerProject>(
          order.customerProjectId,
          config.customerProjectStoragePrefix + order.customerId
        );
      const productList = Object.fromEntries(order.productList.entries());

      for await (const [index, orderProduct] of Object.entries(productList)) {
        const product = await storageClient.get<Projects.Hami.Product>(
          orderProduct.productId,
          config.productStorage
        );
        const supplier = await storageClient.get<Projects.Hami.Supplier>(
          orderProduct.supplierId,
          config.supplierStorage
        );

        productList[index].product = product;
        productList[index].supplier = supplier;
      }

      orderStorage.data[orderId] = {
        creator,
        customer,
        customerProject,
        productList: Object.values(productList),

        ...order,
      };
    }

    if (user.role === 'admin') {
      return orderStorage;
    }

    return {
      ...orderStorage,
      data: Object.fromEntries(
        Object.entries(orderStorage.data).filter(
          (order) => order[1].creatorId === user.id
        )
      ),
    };
  }
);
