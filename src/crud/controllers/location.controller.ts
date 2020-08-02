import {
    Controller,
    Post,
    Get,
    Put,
    Request,
    BadRequestException,
    Body,
    ValidationPipe,
    Delete,
    Param,
} from "@nestjs/common";
import { LocationService } from "../services/location.service";
import { LocationDto } from "../dto/location.dto";

@Controller("api/location")
export class LocationController {
  constructor(private locationService: LocationService) {}

  @Get()
  GetAll() {
    return this.locationService.GetAllLocation();
  }

  @Post()
  CreateLocation(
    @Body(ValidationPipe) locationDto: LocationDto,
    @Request() request
  ) {
    if (request.headers["content-type"] !== "application/json")
      throw new BadRequestException("Invalid content type :(");
    return this.locationService.CreateLocation(locationDto);
  }

  @Delete(":id")
  DeleteLocation(@Param("id") id: string) {
    return this.locationService.DeleteLocation(id);
  }

  @Put(":id")
  UpdateLocation(
    @Body(ValidationPipe) locationDto: LocationDto,
    @Request() request,
    @Param("id") id: string
  ) {
    if (request.headers["content-type"] !== "application/json")
      throw new BadRequestException("Invalid content type :(");
    return this.locationService.UpdateLocation(locationDto, id);
  }
}