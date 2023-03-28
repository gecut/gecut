import { Environment } from '@gecut/types';
import Fastify from 'fastify';
import { app } from './app/app';
import { loggerConfigs } from './app/logger';

const host: string = process.env.HOST ?? 'localhost';
const environment: Environment =
  <Environment>process.env.ENVIRONMENT ?? 'development';
const port: number = process.env.PORT ? Number(process.env.PORT) : 3000;

const server = Fastify({
  logger: loggerConfigs[environment],
});

server.register(app);

server.listen({ port, host }, (err) => {
  if (err) {
    server.log.error(err);
    process.exit(1);
  } else {
    console.log(`[ ready ] http://${host}:${port}`);
  }
});
