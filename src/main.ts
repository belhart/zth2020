import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import * as PostgressConnectionStringParser from "pg-connection-string";
import { Logger } from "@nestjs/common";
import { ConnectionOptions, createConnection } from "typeorm";
import { promises as fs } from 'fs';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.PORT || 3000);
}
bootstrap();
