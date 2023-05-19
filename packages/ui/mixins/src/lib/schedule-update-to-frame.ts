import { SignalMixinInterface } from './signal';

import type { Constructor } from '@alwatr/type';

export declare class ScheduleUpdateToFrameMixinInterface extends SignalMixinInterface {}

export function ScheduleUpdateToFrameMixin<
  T extends Constructor<SignalMixinInterface>
>(superClass: T): Constructor<ScheduleUpdateToFrameMixinInterface> & T {
  class ScheduleUpdateToFrameMixinClass extends superClass {
    protected override async scheduleUpdate(): Promise<void> {
      await new Promise<void>((resolve) => {
        requestAnimationFrame(() => resolve());
      });
      super.scheduleUpdate();
    }
  }
  return ScheduleUpdateToFrameMixinClass as unknown as Constructor<ScheduleUpdateToFrameMixinInterface> &
    T;
}
