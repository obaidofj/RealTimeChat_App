import dataSource from '../db/connection.js';
export async function isFlageSet(flagType) {
    const queryRunner = dataSource.createQueryRunner();
    const result = await queryRunner.query(`SELECT value FROM flags where flag='${flagType}'`);
    return result[0]?.value ?? false;
}
//# sourceMappingURL=generalUtils.js.map