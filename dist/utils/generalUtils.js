import dataSource from '../db/connection.js';
export async function isSeeded() {
    const queryRunner = dataSource.createQueryRunner();
    const result = await queryRunner.query("SELECT seeded FROM flags");
    console.log(result);
    return result[0].seeded;
}
//# sourceMappingURL=generalUtils.js.map