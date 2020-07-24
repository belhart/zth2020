import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Location } from "./location.entity";
import { type } from "os";

@Entity("equipement")
export class Equipment {
  @PrimaryGeneratedColumn("uuid") id: string;
  @Column("text") name: string;
  @Column("text") type: string;

  @ManyToOne(
    type => Location,
    locatedat => locatedat.id,
    { onDelete: "CASCADE" }
  )
  locatedat: string;
}
