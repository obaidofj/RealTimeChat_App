import bcrypt from 'bcrypt';
export class StarterMig {
}
ts1696868409294;
implements;
MigrationInterface;
{
    const hashedPassword = await bcrypt.hash('123456', 10);
    async;
    up(queryRunner, QueryRunner);
    Promise < void  > {
        await, queryRunner, : .query(`
        INSERT INTO user (username, password , email) VALUES ('admin', ${hashedPassword},'admin@hostname.com')
      `)
    };
    async;
    down(queryRunner, QueryRunner);
    Promise < void  > {
        await, queryRunner, : .query(`
        Delete from user where username='admin'
      `)
    };
}
//# sourceMappingURL=1696868409294-starterMig.ts.js.map