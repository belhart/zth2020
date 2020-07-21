import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import * as PostgressConnectionStringParser from "pg-connection-string";
import { Logger } from "@nestjs/common";
import { ConnectionOptions, createConnection } from "typeorm";;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const databaseUrl: string = process.env.DATABASE_URL;
  const connectionOptions = PostgressConnectionStringParser.parse(databaseUrl);
  Logger.log(connectionOptions);
  const typeOrmOptions: ConnectionOptions= {
    type: "postgres",
    host: connectionOptions.host,
    port: parseInt(connectionOptions.port),
    username: connectionOptions.user,
    password: connectionOptions.password,
    database: connectionOptions.database,
    logging: true,
    synchronize: true,
    entities: ["./src/**/*.entity.ts", "./dist/**/*.entity.js"],
  };
  const connection = createConnection(typeOrmOptions);
  (await connection).query("SELECT * FROM ")
  Logger.log(connection);
  await app.listen(process.env.PORT || 3000);
}
bootstrap();
