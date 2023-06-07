import { LitElement } from 'lit';

import { LoggerMixin } from './lib/logger';
import { ScheduleUpdateToFrameMixin } from './lib/schedule-update-to-frame';
import { SignalMixin } from './lib/signal';

export * from './lib/logger';
export * from './lib/signal';

export const loggerElement = LoggerMixin(LitElement);
export const signalElement = SignalMixin(loggerElement);
export const scheduleSignalElement = ScheduleUpdateToFrameMixin(signalElement);
