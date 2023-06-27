import { AppDataSource } from '../data-source';
import { User } from '../entity/User';

export * from '../entity/User';

AppDataSource.initialize()
  .then(async () => {
    console.log('Inserting a new user into the database...');

    const user = new User();

    user.firstName = 'MohammadMahdi';
    user.lastName = 'Zamanian';
    user.password = 'mmz1384';
    user.permission = 'root';
    user.phoneNumber = '09155595488';
    user.active = true;

    await AppDataSource.manager.save(user);

    console.log('Saved a new user with id: ' + user.id);
  })
  .catch((error) => console.log(error));
