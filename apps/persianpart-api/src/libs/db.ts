import { appDataSource } from '../data-source';
import { User } from '../entity/user';

appDataSource
    .initialize()
    .then(async () => {
      const userAdmin = await appDataSource
          .getMongoRepository(User)
          .countBy({ permission: 'root' });

      if (userAdmin === 0) {
        console.log('Inserting a new user into the database...');

        const user = new User();

        user.firstName = 'MohammadMahdi';
        user.lastName = 'Zamanian';
        user.password = 'mmz1384';
        user.permission = 'root';
        user.phoneNumber = '09155595488';
        user.active = true;

        await appDataSource.manager.save(user);

        console.log('Saved a new user with id: ' + user.id);
      }
    })
    .catch((error) => console.log(error));
