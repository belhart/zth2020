import { Injectable, BadRequestException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CrudGateway } from "../crud.gateway";
import { EquipmentDto } from "../dto/equipment.dto";
import { Equipment } from "../entities/equipment.entity";

@Injectable()
export class EquipmentService {
  constructor(
    @InjectRepository(Equipment)
    private equipmentRepository: Repository<Equipment>,
    private gateway: CrudGateway
  ) {}

async GetAllEquipment() {
    return this.equipmentRepository.find();
  }

  async CreateEquipment(equipmentDto: EquipmentDto) {
    const equipment = this.equipmentRepository.create(equipmentDto);
    await this.equipmentRepository.save(equipment);
    return equipment;
  }

  async UpdateEquipment(equipmentDto: EquipmentDto, id: string) {
    try{
      await this.equipmentRepository.update({ id }, equipmentDto);
      return await this.equipmentRepository.findOne({ id });
    }
    catch{
      throw new BadRequestException("No such equipment");
    }
  }

  async DeleteEquipment(id: string) {
    try {
      await this.equipmentRepository.delete({ id });
      return { deleted: true };
    }
    catch{
      throw new BadRequestException("No shuch equipment");
    }
  }
}