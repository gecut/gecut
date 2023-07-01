/* eslint-disable import/order */

import i18n from '@gecut/i18n';
import 'element-internals-polyfill';

i18n.set('fa-IR');

import '@gecut/common/styles/pwa.css';
import '@gecut/common/styles/mobile-only.css';
// // import '@gecut/common/styles/theme/palettes/cadmium-green.css';
import '@gecut/common/styles/theme/palettes/prophet-violet.css';
import '@gecut/common/styles/tokens.css';
import '@gecut/form-builder';
import '@lit-labs/virtualizer';
import 'unfonts.css';

import './ui/app/app.element';
import './ui/stylesheets/styles.css';
