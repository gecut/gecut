import { Environment } from '@gecut/types';
import { FastifyLoggerOptions } from 'fastify';
import { PinoLoggerOptions } from 'fastify/types/logger';

export const loggerConfigs: Record<
  Environment,
  boolean | (FastifyLoggerOptions & PinoLoggerOptions)
> = {
  development: {
    transport: {
      target: 'pino-pretty',
      options: {
        translateTime: 'HH:MM:ss.l',
        ignore: 'pid,hostname',
        colorize: true,
      },
    },
    serializers: {
      res(reply) {
        // The default
        return {
          statusCode: reply.statusCode,
        };
      },
      req(request) {
        const response = {
          method: request.method,
          url: request.url,
          // headers: request.headers,
        };

        if (request.routerPath != request.url) {
          response['path'] = request.routerPath;
        }
        if (Object.keys(request.params).length > 0) {
          response['parameters'] = request.params;
        }

        return response;
      },
    },
  },
  production: false,
  test: true,
};
