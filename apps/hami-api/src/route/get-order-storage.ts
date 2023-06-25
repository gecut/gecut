import { isFieldExits } from '#hami/lib/isExists';
import { when } from '#hami/lib/when';

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
      orderStorage.data[orderId] = await orderModel(orderStorage.data[orderId]);
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

export async function orderModel(
  order: Projects.Hami.Order
): Promise<Projects.Hami.OrderModel> {
  const productStorage = await storageClient.getStorage<Projects.Hami.Product>(
    config.productStorage
  );
  const productList: Projects.Hami.OrderProductModel[] = [];

  for await (const orderProduct of order.productList) {
    productList.push({
      ...orderProduct,
      product: productStorage.data[orderProduct.productId],
    });
  }

  return {
    ...order,

    creator: await when(
      isFieldExits(order.creatorId),
      async () =>
        await storageClient.get<Projects.Hami.User>(
          order.creatorId,
          config.userStorage
        )
    ),
    customer: await when(
      isFieldExits(order.customerId),
      async () =>
        await storageClient.get<Projects.Hami.Supplier>(
          order.customerId,
          config.supplierStorage
        )
    ),
    customerProject: await when(
      isFieldExits(order.customerId),
      async () =>
        await storageClient.get<Projects.Hami.CustomerProject>(
          order.customerProjectId,
          config.customerProjectStoragePrefix + order.customerId
        )
    ),
    supplier: await when(
      isFieldExits(order.supplierId),
      async () =>
        await storageClient.get<Projects.Hami.Supplier>(
          order.supplierId,
          config.supplierStorage
        )
    ),
    productList,
  };
}
