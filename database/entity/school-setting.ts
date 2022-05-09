import { Entity, PrimaryGeneratedColumn, Column, OneToMany, BaseEntity } from "typeorm";

@Entity({ name: 'school-settings' })
export class SchoolSettings extends BaseEntity {

    @Column({ unique: true })
    id: string;

    @Column()
    access_token: string;

    @Column()
    refresh_token: string;
}