import { Controller, Post } from "@nestjs/common";
import { LocationService } from "./location.service";

@Controller("apilocationteszt")
export class LocationController {
  constructor(private locationService: LocationService) {}

  @Post()
  create() {
    return this.locationService.create();
  }
}
