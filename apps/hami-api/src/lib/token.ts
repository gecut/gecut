import {AlwatrTokenGenerator} from '@alwatr/token';

import {config} from './config';

export const tokenGenerator = new AlwatrTokenGenerator(config.token);
