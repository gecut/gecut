import { AlwatrStorageClient } from '@alwatr/storage-client';

import { config } from './config';

import type { AlwatrDocumentObject } from '@alwatr/type/storage';

export const storageClient = new AlwatrStorageClient(
    config.storageClient
) as AlwatrStorageClient<AlwatrDocumentObject>;
