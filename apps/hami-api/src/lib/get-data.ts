import { logger } from './config';
import { storageClient } from './storage';

import type { AlwatrDocumentObject } from '@alwatr/type';

export async function get<T extends AlwatrDocumentObject>(
  documentId: string,
  storage?: string | undefined
): Promise<T | null> {
  logger.logMethodArgs?.('get', { documentId, storage });

  try {
    return await storageClient.get<T>(documentId, storage);
  } catch (error) {
    logger.error('get', 'storage_error', error, { documentId, storage });

    return null;
  }
}
