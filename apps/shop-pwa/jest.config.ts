/* eslint-disable */
export default {
  displayName: 'shop-pwa',
  preset: '../../jest.preset.js',
  transform: {
    '^.+\\.[tj]s$': '@swc/jest',
  },
  moduleFileExtensions: ['ts', 'js', 'html'],
  coverageDirectory: '../../coverage/apps/shop-pwa',
};
