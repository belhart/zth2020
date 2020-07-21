import { Controller, Post, Get, Put, Query, Request, BadRequestException  } from "@nestjs/common";
const exp = require("express");

@Controller("api")
export class CrudController {
  
  @Post("/location")
  getStatusDescription(@Query() query, @Request() request ): string{
    if (request.headers['content-type'] !== 'application/json') throw new BadRequestException('Invalid content type :(');
    console.log(request.headers['content-type']);
    return "asd";
  }
}
