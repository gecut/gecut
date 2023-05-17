import { createLogger } from '@alwatr/logger';

import type { NanoServerConfig } from '@alwatr/nano-server';
import type { TokenGeneratorConfig } from '@alwatr/token';

export const logger = createLogger('hami-api');

export const config = {
  storageClient: {
    host: process.env.STORAGE_HOST ?? '127.0.0.1',
    port: process.env.STORAGE_PORT != null ? +process.env.STORAGE_PORT : 9000,
    token: process.env.STORAGE_TOKEN ?? 'YOUR_SECRET_TOKEN',
  },
  token: <TokenGeneratorConfig>{
    secret: process.env.SECRET ?? 'YOUR_SECRET',
    algorithm: 'sha256',
    encoding: 'base64url',
    duration: null,
  },
  nanoServer: <NanoServerConfig & { adminToken: string }>{
    host: process.env.HOST ?? '0.0.0.0',
    port: process.env.PORT != null ? +process.env.PORT : 3000,
    accessToken: process.env.ACCESS_TOKEN ?? 'YOUR_SECRET_TOKEN',
    adminToken: process.env.ADMIN_TOKEN ?? 'ADMIN_SECRET_TOKEN',
    allowAllOrigin: true,
    requestTimeout: 10_000,
    headersTimeout: 40_000,
    keepAliveTimeout: 30_000,
    healthRoute: true,
  },
  customerStorage: 'customer-storage',
  notificationStorage: 'notification-storage',
  orderStorage: 'order-storage',
  productPriceStorage: 'product-price-storage',
  productStorage: 'product-storage',
  supplierStorage: 'supplier-storage',
  userStorage: 'user-storage',
} as const;

logger.logProperty('config', config);
