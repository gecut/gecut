import { TRPCError, initTRPC } from '@trpc/server';

import type { Context } from './context';

/**
 * Initialization of tRPC backend
 * Should be done only once per backend!
 */
const t = initTRPC.context<Context>().create();

const isAuthed = t.middleware((options) => {
  if (options.ctx.user == null) {
    throw new TRPCError({ code: 'UNAUTHORIZED' });
  }

  return options.next({
    ctx: {
      user: options.ctx.user,
    },
  });
});

const isRoot = t.middleware((options) => {
  if (options.ctx.user.permission !== 'root') {
    throw new TRPCError({ code: 'FORBIDDEN' });
  }

  return options.next({
    ctx: {
      user: options.ctx.user,
    },
  });
});

/**
 * Export reusable router and procedure helpers
 * that can be used throughout the router
 */
export const router = t.router;
export const publicProcedure = t.procedure;
export const protectedProcedure = publicProcedure.use(isAuthed);
export const privateProcedure = protectedProcedure.use(isRoot);
