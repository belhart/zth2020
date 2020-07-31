import { Module } from "@nestjs/common";
import { CrudService } from "./crud.service";
import {
  GatewayController,
  LocationController,
  EquipmentController,
  EmployeeController
} from "./crud.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { DatabaseConnetionService } from "src/database-connection.service";
import { Location } from "../entities/location.entity";
import { Equipment } from "../entities/equipment.entity";
import { Employee } from "../entities/employee.entity";
import { CrudOuterGateway } from './crud-outer.gateway';
import { CrudInnerGateway } from './crud-inner.gateway';

@Module({
  imports: [TypeOrmModule.forFeature([Location, Equipment, Employee])],
  providers: [CrudService,CrudOuterGateway, CrudInnerGateway],
  controllers: [
    LocationController,
    EquipmentController,
    EmployeeController,
    GatewayController
  ]
})
export class CrudModule {}
