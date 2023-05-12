import { LitElement } from 'lit';

import { LoggerMixin } from './lib/logger';
import { SignalMixin } from './lib/signal';

export * from './lib/logger';
export * from './lib/signal';

export const loggerElement = LoggerMixin(LitElement);
export const signalElement = SignalMixin(loggerElement);