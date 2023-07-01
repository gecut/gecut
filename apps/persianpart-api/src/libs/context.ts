import type { inferAsyncReturnType } from '@trpc/server';
import type * as trpcNext from '@trpc/server/adapters/next';

import { appDataSource } from '#persianpart/data-source';
import { User } from '#persianpart/entity/user';

export async function createContext({
  req,
}: trpcNext.CreateNextContextOptions) {
  async function getUserFromHeader() {
    console.log(req.headers.authorization);
    
    if (req.headers.authorization != null) {
      const token = String(req.headers.authorization).replace('Bearer ', '');

      return await appDataSource
        .getMongoRepository(User)
        .findOneBy({ id: token });
    }

    return null
  }
  const user = await getUserFromHeader();

  return {
    user,
  };
}
export type Context = inferAsyncReturnType<typeof createContext>;
