import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from "typeorm";

import User from "./User";
import { uuid } from "uuidv4";

@Entity('task')
class Task {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column()
    provider_id: string;

    @ManyToOne(() => User)
    @JoinColumn({ name: 'provider_id'})
    provider: User;

    @Column('text')
    description: string

    @Column({ default: 'pending' })
    status: string

    @CreateDateColumn()
    create_at: Date;

    @UpdateDateColumn()
    update_at: Date;
}

export default Task