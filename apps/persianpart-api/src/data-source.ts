import 'reflect-metadata';
import { DataSource } from 'typeorm';

import { User } from './entity/user';

export const appDataSource = new DataSource({
  type: 'mongodb',
  appname: 'persianpart',
  database: 'persianpart',
  synchronize: true,
  logging: false,
  entities: [User],
  migrations: [],
  subscribers: [],
  url: 'mongodb://root:trhwB6n79XmAR5WizAeM3fgy@billy.iran.liara.ir:32842/my-app?authSource=admin',
});
