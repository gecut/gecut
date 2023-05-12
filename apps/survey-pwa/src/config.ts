import proxyConfig from '../proxy.conf.json';

// declare global {
//   // interface Signals {
//   // }
//   // interface Providers {
//   // }
// }

const config = {
  apiUrl: proxyConfig['/api/v0'].target,
};

export default config;
