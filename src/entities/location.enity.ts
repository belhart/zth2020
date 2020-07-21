import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity("location")
export class Location {
  @PrimaryGeneratedColumn("uuid") id: string;
  @Column("text") name: string;
  @Column("text") address: string;
}
