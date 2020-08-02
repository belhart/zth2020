import { Controller, Get, Post, Body, ValidationPipe, BadRequestException, Delete, Param, Put, Request } from "@nestjs/common";
import { EmployeeService } from "../services/employee.service";
import { EmployeeDto } from "../dto/employee.dto";

@Controller("/api/employee")
export class EmployeeController {
  constructor(private employeeService: EmployeeService) {}

  @Get()
  GetAll() {
    return this.employeeService.GetAllEmployee();
  }

  @Post()
  CreateEmployee(
    @Body(ValidationPipe) employeeDto: EmployeeDto,
    @Request() request
  ) {
    if (request.headers["content-type"] !== "application/json")
      throw new BadRequestException("Invalid content type :(");
    return this.employeeService.CreateEmployee(employeeDto);
  }

  @Delete(":id")
  DeleteEmployee(@Param("id") id: string) {
    return this.employeeService.DeleteEmployee(id);
  }

  @Put(":id")
  UpdateEmployee(
    @Body(ValidationPipe) employeeDto: EmployeeDto,
    @Request() request,
    @Param("id") id: string
  ) {
    if (request.headers["content-type"] !== "application/json")
      throw new BadRequestException("Invalid content type :(");
    return this.employeeService.UpdateEmployee(employeeDto, id);
  }
}