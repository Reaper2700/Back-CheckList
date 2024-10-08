import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { uuid } from "uuidv4";

@Entity('users')
class User{
@PrimaryGeneratedColumn('uuid')
id: string;

@Column()
name: string;

@Column()
email: string;

@Column()
password: string;

@CreateDateColumn()
create_at: Date;

@UpdateDateColumn()
update_at: Date;
}

export default User;