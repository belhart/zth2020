import { Controller, Get, Query } from '@nestjs/common';

@Controller('http-status')
export class HttpStatusController {

    @Get("/getStatusDescription")
    getStatusDescription(@Query() query): string {
      //TODO implement me
      console.log(query.statusCode);
      return "Im a wrong status code :(";
    }
}
