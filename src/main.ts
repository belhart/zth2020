import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import * as PostgressConnectionStringParser from "pg-connection-string";
import { Logger } from "@nestjs/common";
import { ConnectionOptions, createConnection } from "typeorm";
import { promises as fs } from 'fs';


async function bootstrap() {
  /*const port = process.env.PORT || 3000;
  const html = "<html><head><script src=\"https://cdnjs.cloudflare.com/ajax/libs/socket.io/2.3.0/socket.io.js\"></script><script>function websocketConnect(){const socket = io('wss://zth-main.herokuapp.com/:"+ port + 
  "/order');socket.on('connection', (data) => console.log(data));socket.on('orderRdy', (data) => console.log(data));socket.emit('order', \"new order data text test\");}</script></head><button onclick=\"websocketConnect()\">Connect to server via websocket</button><div id=\"messageFromServer\"></div></html>";
  (async () => {
    await fs.writeFile('./dist/crud/index.html', html);
  })();*/
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.PORT || 3000);
}
bootstrap();
