import { appDataSource } from '#persianpart/data-source';
import { User } from '#persianpart/entity/user';
import { publicProcedure } from '#persianpart/libs/trpc';

export const userRepository = publicProcedure.query(async () => {
  return await appDataSource.getMongoRepository(User).find();
});
