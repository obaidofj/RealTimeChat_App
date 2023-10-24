import connection  from '../connection.js';
import { User } from '../entities/user.entity.js';
import bcrypt from 'bcrypt';
import {isFlageSet} from '../../utils/generalUtils.js'

export async function seedDatabase() {

    if(await isFlageSet('seeded') ){
        console.log('Data already seeded.');
        return; // db is seeded so no need for seed
     }

  try {
    const userRepository = connection.getRepository(User);
    const hashedPassword = await bcrypt.hash('123456', 10);

    // Insert user data
    await userRepository.insert([
      { username: 'admin', password: `${hashedPassword}` , email: 'admin@hostname.com' },
     
    ]);

    console.log('Data seeding completed.');
  } catch (error) {
    console.error('Data seeding failed:', error);
  } finally {
    await connection.close();
  }
}
 
// seedDatabase();
