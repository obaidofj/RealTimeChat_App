// @ts-nocheck
// to be able to deploy successfully to ecs and ec2
import { QueryRunner } from 'typeorm';
import { isFlageSet } from '../utils/generalUtils.js';
import { StarterMigts1696868409294 } from './migrations/1696868409294-starterMig.js';

async function applyMigration(queryRunner: QueryRunner) {

  //   const queryRunner = new QueryRunner(); connection.createQueryRunner();

  const checkApplied = await isFlageSet('migrationAplied');

  if (checkApplied || (Array.isArray(checkApplied) && checkApplied.length === 0)) {
    throw new Error('Migration for Data seeding is already applied.');
  }

  try {
    await queryRunner.startTransaction();
    const migration = new StarterMigts1696868409294(); // Instantiate your migration class
    await migration.up(queryRunner); // Apply the migration
    await queryRunner.commitTransaction();
  } catch (error) {
    await queryRunner.rollbackTransaction();
    throw new Error('Running Migration failed:' + error);
  } finally {
    await queryRunner.release();
    // await connection.close ();
  }

}

export default applyMigration;

