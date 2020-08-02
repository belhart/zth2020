import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { DatabaseConnetionService } from "src/database-connection.service";
import { Location } from "./entities/location.entity";
import { Equipment } from "./entities/equipment.entity";
import { Employee } from "./entities/employee.entity";
import { CrudGateway } from './crud.gateway';
import { LocationController } from "./controllers/location.controller";
import { EquipmentController } from "./controllers/equipment.controller";
import { EmployeeController } from "./controllers/employee.controller";
import { LocationService } from "./services/location.service";
import { EquipmentService } from "./services/equipment.service";
import { EmployeeService } from "./services/employee.service";
import { GatewayController } from "./controllers/gateway.controller";

@Module({
  imports: [TypeOrmModule.forFeature([Location, Equipment, Employee])],
  providers: [LocationService, EmployeeService, EquipmentService,CrudGateway],
  controllers: [
    LocationController,
    EquipmentController,
    EmployeeController,
    GatewayController
  ]
})
export class CrudModule {}
