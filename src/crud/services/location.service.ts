import { Injectable, BadRequestException} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Location } from "../entities/location.entity"
import { LocationDto } from "../dto/location.dto";
import { CrudGateway } from "../crud.gateway";

@Injectable()
export class LocationService {
  constructor(
    @InjectRepository(Location)
    private locationRepository: Repository<Location>,
    private gateway: CrudGateway
  ) {}

  async CreateLocation(locationDto: LocationDto) {
    if (locationDto.name.split(' ').length > 2) throw new BadRequestException("The name of the location can only be a maximum of 2 words");
    var strFirstFour = locationDto.address.substring(0,4);
    if (isNumeric(strFirstFour)) throw new BadRequestException("Location address must start with 4 numbers");
    const location = this.locationRepository.create(locationDto);
    await this.locationRepository.save(location);
    this.gateway.wss.emit('location', location);
    return location;
  }

  async GetAllLocation() {
    return this.locationRepository.find();
  }

  async UpdateLocation(locationDto: LocationDto, id: string) {
    try{
      await this.locationRepository.update({ id }, locationDto);
      return await this.locationRepository.findOne({ id });
    }
    catch{
      throw new BadRequestException("No such location");
    }
  }

  async DeleteLocation(id: string) {
    try{
      await this.locationRepository.delete({ id });
      return { deleted: true };
    }
    catch{
      throw new BadRequestException("No such location");
    }
  }
}

function isNumeric(num){
    return isNaN(num)
}