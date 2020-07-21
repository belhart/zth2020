import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { Location } from './location.enity';
import { Equipement } from './equipement.entity';

@Entity()
export class Employee{
    @PrimaryGeneratedColumn('uuid') id:string;
    @Column('text') name: string;
    @Column('text') job: string;
    @Column('text') worksat: Location;
    @Column('text') operates: Equipement;
}