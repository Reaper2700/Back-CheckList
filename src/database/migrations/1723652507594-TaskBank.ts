import { MigrationInterface, QueryRunner, Table } from "typeorm";

export default class TaskBank1723652507594 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'tasks',
                columns:[
                    {
                        name: 'id',
                        type: 'uuid',
                        isPrimary: true,
                        generationStrategy: 'uuid',
                        default: 'uuid_generate_v4()'
                    },
                    {
                        name: 'provider_id',
                        type: 'varchar',
                    },
                    {
                        name: 'drescription',
                        type: 'text'
                    },
                    {
                        name: 'status',
                        type: 'varchar',
                        isNullable: true, //adicionando uma coluna nova em colunas existentes estudar isso
                        default: "'default-avatar.png'"
                    },
                    {
                        name: 'create_at',
                        type: 'timestamp',
                        default: 'now()'
                    },
                    {
                        name: 'uptade_at',
                        type: 'timestamp',
                        default: 'now()'
                    }
                ]
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        
        await queryRunner.dropTable('tasks');

    }

}
