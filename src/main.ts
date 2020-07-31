import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import * as PostgressConnectionStringParser from "pg-connection-string";
import { Logger } from "@nestjs/common";
import { ConnectionOptions, createConnection } from "typeorm";
const fs = require('fs');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  /*const databaseUrl: string = process.env.DATABASE_URL;
  const connectionOptions = PostgressConnectionStringParser.parse(databaseUrl);
  Logger.log(connectionOptions);
  const typeOrmOptions: ConnectionOptions = {
    type: "postgres",
    host: connectionOptions.host,
    port: parseInt(connectionOptions.port),
    username: connectionOptions.user,
    password: connectionOptions.password,
    database: connectionOptions.database,
    logging: true,
    synchronize: true,
  };
  const connection = createConnection(typeOrmOptions);
  Logger.log((await connection).query("SELECT * FROM demmo7ppms9t5j"));
  Logger.log(connection);*/
  const html = "<html><head><script src=\"https://cdnjs.cloudflare.com/ajax/libs/socket.io/2.3.0/socket.io.js\"></script><script>function websocketConnect(){const socket = io('http://localhost:"+ process.env.PORT + "/order');socket.on('connection', (data) => console.log(data));socket.on('orderRdy', (data) => console.log(data));socket.emit('order', \"new order data text test\");}</script></head><button onclick=\"websocketConnect()\">Connect to server via websocket</button><div id=\"messageFromServer\"></div></html>"
  fs.writeFile('/dist/crud/index.html', html);
  await app.listen(process.env.PORT || 3000);
}
bootstrap();
