import { Module } from "@nestjs/common";
import { CrudService } from "./crud.service";
import {
  CrudController,
  LocationController,
  EquipmentController,
  EmployeeController
} from "./crud.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { DatabaseConnetionService } from "src/database-connection.service";
import { Location } from "../entities/location.entity";
import { Equipment } from "../entities/equipment.entity";
import { Employee } from "src/entities/employee.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Location, Equipment, Employee])],
  providers: [CrudService],
  controllers: [
    CrudController,
    LocationController,
    EquipmentController,
    EmployeeController
  ]
})
export class CrudModule {}