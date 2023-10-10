import connection from './connection.js';
import { StarterMigts1696868409294  } from './migrations/1696868409294-starterMig.js';

async function applyMigration() {
 
  const queryRunner = connection.createQueryRunner();

  try {
    await queryRunner.startTransaction();
    const migration = new StarterMigts1696868409294(); // Instantiate your migration class
    await migration.up(queryRunner); // Apply the migration
    await queryRunner.commitTransaction();
  } catch (error) {
    await queryRunner.rollbackTransaction();
    console.error('Migration failed:', error);
  } finally {
    await queryRunner.release();
    // await connection.close ();
  }
}

applyMigration().then(() => {
  console.log('Migration applied successfully.');
});
