import {AlwatrNanoServer} from '@alwatr/nano-server';

import {config} from './config';

export const nanoServer = new AlwatrNanoServer(config.nanoServer);
