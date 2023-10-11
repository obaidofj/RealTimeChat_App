import bcrypt from 'bcrypt';
export class StarterMigts1696868409294 {
    async up(queryRunner) {
        const hashedPassword = await bcrypt.hash('123456', 10);
        try {
            await queryRunner.query(`
          INSERT INTO user ( username, password , email) VALUES ('admin', '${hashedPassword}','admin@hostname.com')
        `);
            await queryRunner.query(`
          Delete from flags where flag='migrationAplied')
        `);
            await queryRunner.query(`
          INSERT INTO flags ( flag, value ) VALUES ('migrationAplied', true)
        `);
        }
        catch (error) {
            throw new Error("migration not applied");
        }
        //   await queryRunner.query( // this has error
        //     `ALTER TABLE "user" ADD COLUMN "pict" VARCHAR(255) `
        // )
    }
    async down(queryRunner) {
        await queryRunner.query(`
        Delete from user where username='admin'
      `);
    }
}
//# sourceMappingURL=1696868409294-starterMig.js.map