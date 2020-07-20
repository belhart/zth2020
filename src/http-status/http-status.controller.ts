import { Controller, Get, Query, HttpStatus } from "@nestjs/common";
import { response } from "express";

@Controller("http-status")
export class HttpStatusController {
  @Get("/getStatusDescription")
  getStatusDescription(@Query() query): string {
    if (Object.keys(query).indexOf("statusCode") > -1) {
      return HttpStatus[query.statusCode] === undefined
        ? "Not a valid status code"
        : HttpStatus[query.statusCode];
    }
    return "Bad query request. Use statusCode?={statuscode}. CASE SENSITIVE";
  }
}
