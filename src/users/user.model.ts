import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity({ name: "users" }) // Table name
export class User {
    @PrimaryGeneratedColumn('increment')
    id!: number;

    @Column({ type: "varchar", unique: true, nullable: false })
    email!: string;

    @Column({ type: "varchar", unique: true, nullable: false })
    username!: string;

    @Column({ type: "varchar", nullable: false, select: false }) // Exclude by default
    passwordHash: string;

    @Column({ type: "varchar", nullable: false })
    title: string;

    @Column({ type: "varchar", nullable: false })
    firstName: string;

    @Column({ type: "varchar", nullable: false })
    lastName: string;

    @Column({ type: "varchar", nullable: false })
    role: string;

    constructor(email: string, username: string,passwordHash: string, title: string, firstName: string, lastName: string, role: string) {
        this.email = email;
        this.username = username;
        this.passwordHash = passwordHash;
        this.title = title;
        this.firstName = firstName;
        this.lastName = lastName;
        this.role = role;
    }
}
