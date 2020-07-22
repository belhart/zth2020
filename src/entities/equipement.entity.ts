import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import { Location } from "./location.entity";

@Entity("equipement")
export class Equipement {
  @PrimaryGeneratedColumn("uuid") id: string;
  @Column("text") name: string;
  @Column("text") type: string;
  @Column("text") locatedat: Location;
}
