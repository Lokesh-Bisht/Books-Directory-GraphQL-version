import {Entity, PrimaryGeneratedColumn, Column} from "typeorm";

/**
 * Represents a row with 4 columns in the Users table.
 */
@Entity({name: "Users"})
export class User {

    @PrimaryGeneratedColumn()
    userID!: number;

    @Column()
    username!: string;

    @Column()
    email!: string;

    @Column()
    password!: string;
}
