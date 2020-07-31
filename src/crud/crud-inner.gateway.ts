import { WebSocketGateway, WebSocketServer, OnGatewayConnection, SubscribeMessage, MessageBody, OnGatewayInit } from '@nestjs/websockets';
import { Logger } from '@nestjs/common';
import { Socket } from 'net';

@WebSocketGateway({namespace: 'inner'})
export class CrudInnerGateway implements OnGatewayConnection, OnGatewayInit{
    @WebSocketServer() wss;

    afterInit() {
        console.log('Gateway initialized');
    }

    @SubscribeMessage('inner')
    handleConnection(client){
        Logger.log("eeee");
        client.emit('connection', 'Fasza csatlakozas2');
    }

    @SubscribeMessage('inner')
    handleEvent(client: Socket, data: string): void {
        
        Logger.log("asd");
        client.emit('msgRdy', 'Order ready');
    }

    @SubscribeMessage('inner')
    onEvent(client: Socket, data: string): void {
        Logger.log("asd");
    }

    /*const@SubscribeMessage('inner')
    OnEvent(@MessageBody() data: unknown): string{
        Logger.log("asdasdasd");
        return "OK";
    }*/
}