import { publicProcedure, router } from './trpc';

export const appRouter = router({
  health: publicProcedure.query(() => ({
    app: '..:: Gecut Hami API ::..',
    message: 'Hello ;)',
  })),
});

export type AppRouter = typeof appRouter;
