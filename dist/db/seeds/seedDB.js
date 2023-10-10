import connection from '../connection.js';
import { User } from '../entities/user.entity.js';
async function seedDatabase() {
    try {
        const userRepository = connection.getRepository(User);
        // Insert user data
        await userRepository.insert([
            { username: 'admin', email: 'admin@hostname.com' },
        ]);
        console.log('Data seeding completed.');
    }
    catch (error) {
        console.error('Data seeding failed:', error);
    }
    finally {
        await connection.close();
    }
}
seedDatabase();
//# sourceMappingURL=seedDB.js.map