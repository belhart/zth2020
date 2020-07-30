import { WebSocketGateway, WebSocketServer, OnGatewayConnection, SubscribeMessage} from '@nestjs/websockets';
import { Socket } from 'net';

@WebSocketGateway({namespace: 'order'})
export class CrudOuterGateway implements OnGatewayConnection{
    @WebSocketServer() wss;

    @SubscribeMessage('order')
    handleConnection(client){
        client.emit('connection', 'Fasza csatlakozas');
    }

    @SubscribeMessage('order')
    handleEvent(client: Socket, data: string): string {
        return data;
    }
}

function sleep(ms) {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
} 