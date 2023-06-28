import { publicProcedure, router } from './trpc';

import { userInformation } from '#persianpart/routes/user/information';
import { userRepository } from '#persianpart/routes/user/repository';

export const appRouter = router({
  health: publicProcedure.query(() => ({
    app: '..:: Gecut Hami API ::..',
    message: 'Hello ;)',
  })),
  userInformation,
  userRepository,
});

export type AppRouter = typeof appRouter;
