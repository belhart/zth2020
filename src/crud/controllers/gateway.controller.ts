import { Controller, Get, Res } from "@nestjs/common";
import path = require("path");
import { Response } from 'express';

@Controller("api/order")
export class GatewayController{

  @Get()
  get(@Res() res: Response) {
    res.sendFile(path.join(__dirname + '/index.html'));
  }
}