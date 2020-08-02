import { WebSocketGateway, WebSocketServer, OnGatewayConnection, SubscribeMessage, OnGatewayInit} from '@nestjs/websockets';
import { Socket } from 'net';

@WebSocketGateway({namespace: 'order'})
export class CrudGateway implements OnGatewayConnection, OnGatewayInit {
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
        client.emit("orderRdy", "Your order is ready");
    }
}

function sleep(ms) {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
} 