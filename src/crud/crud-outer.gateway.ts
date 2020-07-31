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
    async handleEvent(client: Socket, data: string) {
        await sleep(1000);
        client.emit("orderRdy", "READY");
    }
}



function sleep(ms) {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
} 