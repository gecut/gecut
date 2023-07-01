import { protectedProcedure } from '#persianpart/libs/trpc';

export const userInformation = protectedProcedure.query(async (options) => {
  return options.ctx.user;
});
