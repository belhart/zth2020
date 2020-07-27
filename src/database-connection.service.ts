import { Injectable } from "@nestjs/common";
import { TypeOrmOptionsFactory, TypeOrmModuleOptions } from "@nestjs/typeorm";

@Injectable()
export class DatabaseConnetionService implements TypeOrmOptionsFactory {
  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      name: "default",
      type: "postgres",
      host: process.env.NOT_HEROKU_HOST || "95.111.254.24",
      port: 5432,
      username: process.env.DB_USERNAME || "dbowner",
      password: process.env.DB_PASSWORD || "dc2ggdhn",
      database: "zth",
      logging: true,
      synchronize: true,
      dropSchema: false,
      entities: ["dist/**/*.entity.js"]
    };
  }
}
