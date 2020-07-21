import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import * as PostgressConnectionStringParser from "pg-connection-string";
import { Logger } from "@nestjs/common";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const databaseUrl: string = process.env.DATABASE_URL;
  const connectionOptions = PostgressConnectionStringParser.parse(databaseUrl);
  Logger.log(connectionOptions);
  await app.listen(process.env.PORT || 3000);
}
bootstrap();
