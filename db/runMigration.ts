import connection from './connection.js';
import { QueryRunner } from 'typeorm';
import { StarterMigts1696868409294  } from './migrations/1696868409294-starterMig.js';
import {isFlageSet} from '../utils/generalUtils.js'

async function applyMigration(queryRunner: QueryRunner) {
 
//   const queryRunner = new QueryRunner(); connection.createQueryRunner();

const checkApplied=await isFlageSet('migrationAplied');

if(checkApplied || (Array.isArray(checkApplied) && checkApplied.length === 0 )){
  throw new Error('Migration for Data seeding is already aplied.');
  return; // migration for seeding is applied so no need for it
} 

  try {
    await queryRunner.startTransaction();
    const migration = new StarterMigts1696868409294(); // Instantiate your migration class
    await migration.up(queryRunner); // Apply the migration
    await queryRunner.commitTransaction();
  } catch (error) {
    await queryRunner.rollbackTransaction();
    throw new Error('Running Migration failed:'+ error);
  } finally {
    await queryRunner.release(); 
    // await connection.close ();
  }

}

export default applyMigration;

