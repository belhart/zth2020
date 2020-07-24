import {
  Controller,
  Post,
  Get,
  Put,
  Query,
  Request,
  BadRequestException,
  Body,
  ValidationPipe,
  Delete,
  Param
} from "@nestjs/common";
import { CrudService } from "./crud.service";
import { LocationDto } from "./location.dto";
import { EquipmentDto } from "./equipment.dto";
import { EmployeeDto } from "./employee.dto";

@Controller("api")
export class CrudController {
  constructor(private crudService: CrudService) {}

  @Post("/location2")
  getStatusDescription(@Query() query, @Request() request): string {
    if (request.headers["content-type"] !== "application/json")
      throw new BadRequestException("Invalid content type :(");
    console.log(request.headers["content-type"]);
    return "asd";
  }
}

@Controller("api/location")
export class LocationController {
  constructor(private crudService: CrudService) {}

  @Get()
  GetAll() {
    return this.crudService.GetAllLocation();
  }

  @Post()
  CreateLocation(
    @Body(ValidationPipe) locationDto: LocationDto,
    @Request() request
  ) {
    if (request.headers["content-type"] !== "application/json")
      throw new BadRequestException("Invalid content type :(");
    return this.crudService.CreateLocation(locationDto);
  }

  @Delete(":id")
  DeleteLocation(@Param("id") id: string) {
    return this.crudService.DeleteLocation(id);
  }

  @Put(":id")
  UpdateLocation(
    @Body(ValidationPipe) locationDto: LocationDto,
    @Request() request,
    @Param("id") id: string
  ) {
    if (request.headers["content-type"] !== "application/json")
      throw new BadRequestException("Invalid content type :(");
    return this.crudService.UpdateLocation(locationDto, id);
  }
}

@Controller("/api/equipment")
export class EquipmentController {
  constructor(private crudService: CrudService) {}

  @Get()
  GetAll() {
    return this.crudService.GetAllEquipment();
  }

  @Post()
  CreateEquipment(
    @Body(ValidationPipe) equipmentDto: EquipmentDto,
    @Request() request
  ) {
    if (request.headers["content-type"] !== "application/json")
      throw new BadRequestException("Invalid content type :(");
    return this.crudService.CreateEquipment(equipmentDto);
  }

  @Delete(":id")
  DeleteEquipment(@Param("id") id: string) {
    return this.crudService.DeleteEquipment(id);
  }

  @Put(":id")
  UpdateEquipment(
    @Body(ValidationPipe) equipmentDto: EquipmentDto,
    @Request() request,
    @Param("id") id: string
  ) {
    if (request.headers["content-type"] !== "application/json")
      throw new BadRequestException("Invalid content type :(");
    return this.crudService.UpdateEquipment(equipmentDto, id);
  }
}

@Controller("/api/employee")
export class EmployeeController {
  constructor(private crudService: CrudService) {}

  @Get()
  GetAll() {
    return this.crudService.GetAllEmployee();
  }

  @Post()
  CreateEmployee(
    @Body(ValidationPipe) employeeDto: EmployeeDto,
    @Request() request
  ) {
    if (request.headers["content-type"] !== "application/json")
      throw new BadRequestException("Invalid content type :(");
    return this.crudService.CreateEmployee(employeeDto);
  }

  @Delete(":id")
  DeleteEmployee(@Param("id") id: string) {
    return this.crudService.DeleteEmployee(id);
  }

  @Put(":id")
  UpdateEmployee(
    @Body(ValidationPipe) employeeDto: EmployeeDto,
    @Request() request,
    @Param("id") id: string
  ) {
    if (request.headers["content-type"] !== "application/json")
      throw new BadRequestException("Invalid content type :(");
    return this.crudService.UpdateEmployee(employeeDto, id);
  }
}
