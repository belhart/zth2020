import { WebSocketGateway, WebSocketServer, OnGatewayConnection, SubscribeMessage, OnGatewayInit} from '@nestjs/websockets';
import { Socket } from 'net';
import { Logger } from '@nestjs/common';

@WebSocketGateway({namespace: 'order'})
export class CrudOuterGateway implements OnGatewayConnection, OnGatewayInit {
    @WebSocketServer() wss;


    afterInit() {
        console.log('Gateway initialized');
    }


    @SubscribeMessage('order')
    handleConnection(client){
        client.emit('connection', 'Fasza csatlakozas');
    }

    @SubscribeMessage('order')
    handleEvent(client: Socket, data: string): void {
        Logger.log(data);
        client.emit('inner', data);
    }
}



function sleep(ms) {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
} 