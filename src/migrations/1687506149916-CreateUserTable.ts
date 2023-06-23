import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateUserTable1687506149916 implements MigrationInterface {
    name = 'CreateUserTable1687506149916'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`User\` CHANGE \`signUpVerifyToken\` \`signupVerifyToken\` varchar(60) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`User\` CHANGE \`signupVerifyToken\` \`signUpVerifyToken\` varchar(60) NOT NULL`);
    }

}
