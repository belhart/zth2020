import { Controller, Get, Body } from '@nestjs/common';
import { Point } from './point';

@Controller('squares')
export class SquaresController {

    @Get("/getNumberOfSquares")
    getNumberOfSquares(@Body() listOfPoint: Point[]): number {
      //TODO implement me
      console.log(listOfPoint);
      return null;
    }
}
