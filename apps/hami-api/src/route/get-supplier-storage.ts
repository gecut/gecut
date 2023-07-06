import { config, logger } from '../lib/config';
import { nanoServer } from '../lib/server';
import { storageClient } from '../lib/storage';
import { requireSignedIn } from '../util/require-signed-in';

import { orderModel } from './get-order-storage';

import type { AlwatrDocumentStorage } from '@alwatr/type';
import type { Projects } from '@gecut/types';

nanoServer.route(
    'GET',
    '/supplier-storage/',
    async (connection): Promise<Projects.Hami.Routes['supplier-storage']> => {
      logger.logMethod?.('get-supplier-storage');

      await requireSignedIn(connection);

      const supplierStorage =
      await storageClient.getStorage<Projects.Hami.Supplier>(
          config.supplierStorage
      );
      const orderStorage = await storageClient.getStorage<Projects.Hami.Order>(
          config.orderStorage
      );

      for await (const supplierId of Object.keys(supplierStorage.data)) {
        const supplier = supplierStorage.data[supplierId];
        const orderList: Projects.Hami.OrderModel[] = [];

        for await (const order of Object.values(orderStorage.data).filter(
            (order) => order.supplierId === supplierId
        )) {
          orderList.push(await orderModel(order));
        }

        const supplierModel: Projects.Hami.SupplierModel = {
          ...supplier,
          orderList,
        };

        supplierStorage.data[supplierId] = supplierModel;
      }

      return supplierStorage as AlwatrDocumentStorage<Projects.Hami.SupplierModel>;
    }
);
