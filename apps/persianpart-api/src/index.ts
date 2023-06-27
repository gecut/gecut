import { createHTTPServer } from '@trpc/server/adapters/standalone';

import { appRouter } from './libs/app';

let requestCounter = 0;

const server = createHTTPServer({
  router: appRouter,
});

server.listen(3000, '0.0.0.0');

server.server.on('listening', () => {
  console.log('Server Listening `0.0.0.0:3000`')
});
server.server.on('request', (request, response) => {
  requestCounter++;

  console.log(
    `[${String(requestCounter).padStart(5, ':')}]`,
    request.method,
    request.url,
    ' => ',
    response.statusCode
  );
});
