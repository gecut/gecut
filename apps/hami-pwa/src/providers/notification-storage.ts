import { setProvider } from '@gecut/signal';
import { kyInstance } from './request-base';

setProvider('notification-storage', () => {
    kyInstance.get('')
});
