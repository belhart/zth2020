import { Controller, Get, Query } from "@nestjs/common";

@Controller()
export class AppController {
  getHello(): string {
    return "Hello World!";
  }
  constructor() {}
}
