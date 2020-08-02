/*import {
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
  Param,
  Logger,
  Req,
  Res,
} from "@nestjs/common";
import { CrudService } from "./crud.service";
import { LocationDto } from "./dto/location.dto";
import { EquipmentDto } from "./dto/equipment.dto";
import { EmployeeDto } from "./dto/employee.dto";
import { CrudGateway } from './crud.gateway';
import { Socket } from "net";
import * as rawbody from 'raw-body';
import { Response } from 'express';
import path = require("path");

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

@Controller("api/order")
export class GatewayController{
  constructor(private gateway: CrudGateway) {}

  @Post()
  async placeAnOrder(@Body() data, @Req() req){
    if (req.readable) {
      // body is ignored by NestJS -> get raw body from request
      const raw = await rawbody(req);
      const text = raw.toString().trim();
      const asd = new Socket();
      asd.connect(3000, 'localhost', function(){
          asd.on('connetion', data => Logger.log(data));
          asd.on('msgRdy', data => Logger.log(data));
          this.gateway.handleEvent(asd, text);
          console.log('Connected');
          asd.emit('order', text);
      });
      asd.on('connetion', data => Logger.log(data));
      //return this.gateway.handleEvent(asd, text);

    } else {
      // body is parsed by NestJS
      const asd = new Socket();
      return this.gateway.handleEvent(asd, data);
    }

    return "asd";
  }


  @Get()
  get(@Res() res: Response) {
    res.sendFile(path.join(__dirname + '/index.html'));
  }
}*/
