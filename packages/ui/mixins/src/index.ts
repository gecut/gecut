import { LitElement } from 'lit';

import { LoggerMixin } from './lib/logger';

export * from './lib/logger';

export const loggerElement = LoggerMixin(LitElement);