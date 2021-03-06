import { Injectable, BadRequestException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CrudGateway } from "../crud.gateway";
import { EmployeeDto } from "../dto/employee.dto";
import { Employee } from "../entities/employee.entity";
import { Equipment } from "../entities/equipment.entity";

@Injectable()
export class EmployeeService {
  constructor(
    @InjectRepository(Employee)
    private employeeRepository: Repository<Employee>,
    @InjectRepository(Equipment)
    private equipmentRepository: Repository<Equipment>,
    private gateway: CrudGateway
  ) {}
  async GetAllEmployee() {
    return this.employeeRepository.find();
  }

  async CreateEmployee(employeeDto: EmployeeDto) {
    if (employeeDto.name.split(' ').length > 3 || employeeDto.name.split(' ').length < 2) throw new BadRequestException("The name of the employee can only be a maximum of 3 words and minimum of 2");
    await notSameLocationCheck(employeeDto, this.equipmentRepository).catch(err => {throw new BadRequestException(err.message)});
    await equipmentInUseCheck(employeeDto, this.employeeRepository).catch(err => {throw new BadRequestException(err.message)});
    switch (employeeDto.job) {
      case "manager": {
        let locat = employeeDto.worksat;
        let isThereAManager = await this.employeeRepository.find({
          where: { worksat: locat, job: "manager" }
        });
        if (isThereAManager.length === 0) {
          const op = employeeDto.operates;
          const loc = employeeDto.worksat;
          const equip  = await this.equipmentRepository.find({ where: {id: op, locatedat: loc}});
          if(equip.length === 0) throw new BadRequestException("The equipment is not at the same location as the manager");
          if (await ManagerSalaryValidaton(employeeDto.worksat, employeeDto.salary, this.employeeRepository))
            return await CreateEmployeeAfterValidation(employeeDto, this.employeeRepository);
          throw new BadRequestException("The salary of the manager is too low max salary at this location");
        }
        throw new BadRequestException(
          "There is a manager at this location already"
        );
      }
      case "cook": {
        let locat = employeeDto.worksat;
        let [
          allOven,
          amountOfOvens
        ] = await this.equipmentRepository.findAndCount({
          where: { locatedat: locat, type: "oven" }
        });
        let [
          allCooks,
          amountOfCook
        ] = await this.employeeRepository.findAndCount({
          where: { worksat: locat, job: "cook" }
        });
        var create = false;
        Object.keys(allOven).forEach(async function(key){
          if (Object.values(allOven[key]).indexOf(employeeDto.operates) > -1) create = true;
        });
        if (create){
          if (amountOfCook < amountOfOvens && amountOfCook > 0) {
            if (SalaryValidation(allCooks, employeeDto.salary)) return await CreateEmployeeAfterValidation(employeeDto, this.employeeRepository);
            throw new BadRequestException("The salary of the employee is too low or too high than the avarge salary at this location");
          }
          else if (amountOfCook < amountOfOvens && amountOfCook === 0){
            return await CreateEmployeeAfterValidation(employeeDto, this.employeeRepository);
          }
          throw new BadRequestException(
            "There are not enough ovens at this location"
          );
        };
        throw new BadRequestException("Cooks can only operate ovens");
      }
      case "cashier": {
        let locat = employeeDto.worksat;
        let [
          allRegisters,
          amountOfCashRegisters
        ] = await this.equipmentRepository.findAndCount({
          where: { locatedat: locat, type: "cash register" }
        });
        let [
          allCashier,
          amountOfCashier
        ] = await this.employeeRepository.findAndCount({
          where: { worksat: locat, job: "cashier" }
        });
        var create = false;
        Object.keys(allRegisters).forEach(async function(key){
          if (Object.values(allRegisters[key]).indexOf(employeeDto.operates) > -1) create = true;
        });
        if (create){
          if (amountOfCashier < amountOfCashRegisters) {
            if (SalaryValidation(allCashier, employeeDto.salary)) return await CreateEmployeeAfterValidation(employeeDto, this.employeeRepository);
            throw new BadRequestException("The salary of the employee is too low or too high than the avarge salary at this location");
          }
          throw new BadRequestException(
            "There are not enough cash registers at this location"
          );
        };
        throw new BadRequestException("Cashiers can only operate cash registers");
      }
    }
    throw new BadRequestException("How did you end up here?");
  }

  async UpdateEmployee(employeeDto: EmployeeDto, id: string) {
    try{
      await this.employeeRepository.update({ id }, employeeDto);
      return await this.employeeRepository.findOne({ id });
    }
    catch{
      throw new BadRequestException("No such employee");
    }
  }

  async DeleteEmployee(id: string) {
    try{
      await this.employeeRepository.delete({ id });
      return { deleted: true };
    }
    catch{
      throw new BadRequestException("No such employee");
    }
  }
}

function SalaryValidation(employees, salaryOfTheNewEmployee){
  var sum = 0;
  Object.keys(employees).forEach(function(key){
    sum += employees[key]['salary'];
  });
  var avgSalary = sum / employees.length;
  var minAllowedSalary = avgSalary * 0.8;
  var maxAllowedSalary = avgSalary * 1.2;
  if (salaryOfTheNewEmployee > minAllowedSalary && salaryOfTheNewEmployee < maxAllowedSalary) return true;
  return false;
}

async function ManagerSalaryValidaton(location, newManagerSalary, employeeRepository){
  const employees = await employeeRepository.find({where: { worksat: location}});
  var maxSalary: Number = 0;
  Object.keys(employees).forEach(function(key){
    if (employees[key]['salary'] > maxSalary) maxSalary = employees[key]['salary'];
  });
  if (Number(newManagerSalary) > Number(maxSalary)){
    return true;
  }
  return false;
}

async function CreateEmployeeAfterValidation(employeeDto: EmployeeDto, employeeRepository){
  const Employee = await employeeRepository.create(employeeDto);
  await employeeRepository.save(Employee);
  return Employee;
}

async function notSameLocationCheck(employeeDto: EmployeeDto, equipmentRepository){
  const equipId = employeeDto.operates;
  let locat = employeeDto.worksat;
  const sameLocation = await equipmentRepository.find({where: {id: equipId, locatedat: locat}}); // 0 ha nem ugyanaz, 1 ha ugyanaz
  if (sameLocation.length === 0) {
    throw new BadRequestException("Not the same location");
  }
  return;
}

async function equipmentInUseCheck(employeeDto, employeeRepository){
  const equipId = employeeDto.operates;
  const sameLocation = await employeeRepository.find({where: {operates: equipId}});
  if (sameLocation.length === 0) {
    return;
  }
  throw new BadRequestException("Equipment already in use by someone else");
}