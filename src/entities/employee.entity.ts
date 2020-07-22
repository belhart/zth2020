import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity("employee")
export class Employee {
  @PrimaryGeneratedColumn("uuid") id: string;
  @Column("text") name: string;
  @Column("text") job: string;
  @Column("text") worksat: string;
  @Column("text") operates: string;
}
