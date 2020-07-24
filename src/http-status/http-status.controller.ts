import { Controller, Get, Query, HttpStatus, BadRequestException } from "@nestjs/common";
import { response } from "express";

@Controller("http-status")
export class HttpStatusController {
  @Get("/getStatusDescription")
  getStatusDescription(@Query() query): string {
    if (Object.keys(query).indexOf("statusCode") > -1) {
      if (HttpStatus[query.statusCode] === undefined) throw new BadRequestException("Not a valid status code");
      return HttpStatus[query.statusCode];
    }
    throw new BadRequestException("Bad query request. Use statusCode?={statuscode}. CASE SENSITIVE");
  }
}
