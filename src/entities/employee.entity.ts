import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToOne } from "typeorm";
import { Location } from "../entities/location.entity"
import { Equipment } from "./equipment.entity";

@Entity("employee")
export class Employee {
  @PrimaryGeneratedColumn("uuid") id: string;
  @Column("text") name: string;
  @Column("text") job: string;
  @ManyToOne((type) => Equipment, (operates) => operates.id) operates: string;
  @ManyToOne((type) => Location, (worksat) => worksat.id) worksat: string;
}
