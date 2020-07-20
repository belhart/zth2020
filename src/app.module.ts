import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { HttpStatusController } from "./http-status/http-status.controller";
import { CrudController } from "./crud/crud.controller";
import { SquaresController } from "./squares/squares.controller";

@Module({
  imports: [],
  controllers: [
    AppController,
    HttpStatusController,
    CrudController,
    SquaresController
  ],
  providers: []
})
export class AppModule {}
