import { AlwatrStorageClient } from '@alwatr/storage-client';

import { config } from './config';

export const storageClient = new AlwatrStorageClient(config.storageClient);
