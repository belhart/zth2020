import { WebSocketGateway, WebSocketServer, OnGatewayConnection, SubscribeMessage, MessageBody } from '@nestjs/websockets';
import { Logger } from '@nestjs/common';
import { Socket } from 'net';

@WebSocketGateway()
export class CrudInnerGateway implements OnGatewayConnection{
    @WebSocketServer() wss;

    @SubscribeMessage('inner')
    handleConnection(client){
        Logger.log("111");
        client.emit('connection', 'Fasza csatlakozas');
    }

    @SubscribeMessage('inner')
    handleEvent(client: Socket, data: unknown) {
        Logger.log("as3d");
        client.emit('msgback', "asdasd");
    }

    /*const@SubscribeMessage('inner')
    OnEvent(@MessageBody() data: unknown): string{
        Logger.log("asdasdasd");
        return "OK";
    }*/
}