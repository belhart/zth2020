import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Location } from '../entities/location.entity';
import { LocationDto } from './location.dto';
import { Equipment } from 'src/entities/equipment.entity';
import { Employee } from 'src/entities/employee.entity';
import { EquipmentDto } from './equipment.dto';
import { EmployeeDto } from './employee.dto';

@Injectable()
export class CrudService {
    constructor(@InjectRepository(Location) private locationRepository:Repository<Location>,
    @InjectRepository(Equipment) private equipmentRepository:Repository<Equipment>,
    @InjectRepository(Employee) private employeeRepository:Repository<Employee>,
    ) {}

    ///LOCATION
    async CreateLocation(locationDto: LocationDto){
        const location = this.locationRepository.create(locationDto);
        await this.locationRepository.save(location);
        return location;
    }

    async GetAllLocation(){
        return this.locationRepository.find();
    }

    async UpdateLocation(locationDto: LocationDto, id: string){
        await this.locationRepository.update({id}, locationDto);
        return await this.locationRepository.findOne({id});
    }

    async DeleteLocation(id: string){
        await this.locationRepository.delete({id});
        return { deleted: true };
    }


     ///EQUIPMENT
    async GetAllEquipment(){
        return this.equipmentRepository.find();
    }

    async CreateEquipment(equipmentDto: EquipmentDto){
        const equipment = this.equipmentRepository.create(equipmentDto);
        await this.equipmentRepository.save(equipment);
        return equipment;
    }

    async UpdateEquipment(equipmentDto: EquipmentDto, id: string){
        await this.equipmentRepository.update({id}, equipmentDto);
        return await this.equipmentRepository.findOne({id});
    }

    async DeleteEquipment(id: string){
        await this.equipmentRepository.delete({id});
        return { deleted: true };
    }

     ///EMPLOYEE
     async GetAllEmployee(){
        return this.equipmentRepository.find();
    }

    async CreateEmployee(employeeDto: EmployeeDto){
        const Employee = this.employeeRepository.create(employeeDto);
        await this.employeeRepository.save(Employee);
        return Employee;
    }

    async UpdateEmployee(employeeDto: EmployeeDto, id: string){
        await this.employeeRepository.update({id}, employeeDto);
        return await this.employeeRepository.findOne({id});
    }

    async DeleteEmployee(id: string){
        await this.employeeRepository.delete({id});
        return { deleted: true };
    }
}

