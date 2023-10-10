import { MigrationInterface, QueryRunner } from "typeorm"
import bcrypt from 'bcrypt';


export class StarterMigts1696868409294 implements MigrationInterface {

   

    public async up(queryRunner: QueryRunner): Promise<void> {
        const hashedPassword = await bcrypt.hash('123456', 10);
        await queryRunner.query(`
        INSERT INTO user (username, password , email) VALUES ('admin', ${hashedPassword},'admin@hostname.com')
      `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
        Delete from user where username='admin'
      `);
    }

}
