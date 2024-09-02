export class CreateTables1724004193512 {
    name = 'CreateTables1724004193512'

    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE "users" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "password" character varying NOT NULL, "email" character varying NOT NULL, "routine_id" integer NOT NULL, "routine_dayOfWeek" character varying NOT NULL, CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "routine_has_exercise" ("routine_id" integer NOT NULL, "routine_dayOfWeek" character varying NOT NULL, "exercise_id" integer NOT NULL, CONSTRAINT "PK_4e8c276624e43be39995770a926" PRIMARY KEY ("routine_id", "exercise_id"))`);
        await queryRunner.query(`CREATE TABLE "routine" ("id" SERIAL NOT NULL, "dayOfWeek" character varying NOT NULL, CONSTRAINT "PK_8ad25ab3660cac834fe7396e8ab" PRIMARY KEY ("id", "dayOfWeek"))`);
        await queryRunner.query(`CREATE TABLE "exercise" ("id" SERIAL NOT NULL, "excerciseName" character varying NOT NULL, "numSeries" integer NOT NULL, "numReps" integer NOT NULL, CONSTRAINT "PK_a0f107e3a2ef2742c1e91d97c14" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "routine_has_exercise" ADD CONSTRAINT "FK_fbb1137a5343a447355b343b2dd" FOREIGN KEY ("exercise_id") REFERENCES "exercise"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "routine_has_exercise" DROP CONSTRAINT "FK_fbb1137a5343a447355b343b2dd"`);
        await queryRunner.query(`DROP TABLE "exercise"`);
        await queryRunner.query(`DROP TABLE "routine"`);
        await queryRunner.query(`DROP TABLE "routine_has_exercise"`);
        await queryRunner.query(`DROP TABLE "users"`);
    }
}
