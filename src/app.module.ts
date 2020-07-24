import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { HttpStatusController } from "./http-status/http-status.controller";
import { CrudController } from "./crud/crud.controller";
import { SquaresController } from "./squares/squares.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { DatabaseConnetionService } from "./database-connection.service";
//import { LocationController } from "./entities/location.controller";
import { CrudModule } from "./crud/crud.module";

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useClass: DatabaseConnetionService
    }),
    CrudModule
  ],
  controllers: [AppController, HttpStatusController, SquaresController],
  providers: []
})
export class AppModule {}
