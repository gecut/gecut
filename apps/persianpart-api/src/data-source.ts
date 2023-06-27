import 'reflect-metadata';
import { DataSource } from 'typeorm';

import { User } from './entity/User.js';

export const AppDataSource = new DataSource({
  type: 'mongodb',
  database: 'test',
  synchronize: true,
  logging: false,
  entities: [User],
  migrations: [],
  subscribers: [],
});
