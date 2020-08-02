import { Controller, Get, Post, Body, ValidationPipe, Request, BadRequestException, Delete, Param, Put } from "@nestjs/common";
import { EquipmentService } from "../services/equipment.service";
import { EquipmentDto } from "../dto/equipment.dto";

@Controller("/api/equipment")
export class EquipmentController {
  constructor(private equipmentService: EquipmentService) {}

  @Get()
  GetAll() {
    return this.equipmentService.GetAllEquipment();
  }

  @Post()
  CreateEquipment(
    @Body(ValidationPipe) equipmentDto: EquipmentDto,
    @Request() request
  ) {
    if (request.headers["content-type"] !== "application/json")
      throw new BadRequestException("Invalid content type :(");
    return this.equipmentService.CreateEquipment(equipmentDto);
  }

  @Delete(":id")
  DeleteEquipment(@Param("id") id: string) {
    return this.equipmentService.DeleteEquipment(id);
  }

  @Put(":id")
  UpdateEquipment(
    @Body(ValidationPipe) equipmentDto: EquipmentDto,
    @Request() request,
    @Param("id") id: string
  ) {
    if (request.headers["content-type"] !== "application/json")
      throw new BadRequestException("Invalid content type :(");
    return this.equipmentService.UpdateEquipment(equipmentDto, id);
  }
}


