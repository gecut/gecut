import { createLogger } from '@gecut/logger';

const logger = createLogger('demo/logger', true);

logger.property?.('foo', 'bar');

logger.method?.('foo');
logger.methodArgs?.('foo', { bar: 'bar' });
logger.methodFull?.('foo', 'bar', 'foo-bar');

logger.other?.('foo', 'bar', 'foo-bar');

logger.warning?.('foo', 'bar', 'foo-bar');
logger.error?.('foo', 'bar', 'foo-bar');
