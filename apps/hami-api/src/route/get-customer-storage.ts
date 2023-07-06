import { get } from '#hami/lib/get-data';

import { config, logger } from '../lib/config';
import { nanoServer } from '../lib/server';
import { storageClient } from '../lib/storage';
import { requireSignedIn } from '../util/require-signed-in';

import { orderModel } from './get-order-storage';

import type { AlwatrDocumentStorage } from '@alwatr/type/storage';
import type { Projects } from '@gecut/types';

nanoServer.route(
    'GET',
    '/customer-storage/',
    async (connection): Promise<Projects.Hami.Routes['customer-storage']> => {
      logger.logMethod?.('get-customer-storage');

      await requireSignedIn(connection);

      const customerStorage =
      await storageClient.getStorage<Projects.Hami.Customer>(
          config.customerStorage
      );
      const orderStorage = await storageClient.getStorage<Projects.Hami.Order>(
          config.orderStorage
      );

      for await (const customerId of Object.keys(customerStorage.data)) {
        const customer = customerStorage.data[customerId];
        const creator = await get<Projects.Hami.User>(
            customer.creatorId,
            config.userStorage
        );
        const customerProjectStorage =
        await storageClient.getStorage<Projects.Hami.CustomerProject>(
            config.customerProjectStoragePrefix + customerId
        );
        const projectList: Projects.Hami.CustomerProjectModel[] = [];
        const orderList: Projects.Hami.OrderModel[] = [];

        for await (const order of Object.values(orderStorage.data).filter(
            (order) => order.customerId === customerId
        )) {
          orderList.push(await orderModel(order));
        }

        for await (const project of Object.values(customerProjectStorage.data)) {
          projectList.push({
            ...project,

            ordersCount: orderList.filter(
                (order) => order.customerProjectId === project.id
            ).length,
          });
        }

        delete creator['password'];
        const customerModel: Projects.Hami.CustomerModel = {
          creator,
          orderList,
          projectList,
          ...customer,
        };

        customerStorage.data[customerId] = customerModel;
      }

      return customerStorage as AlwatrDocumentStorage<Projects.Hami.CustomerModel>;
    }
);
