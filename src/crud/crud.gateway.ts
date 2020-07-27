import { WebSocketGateway, WebSocketServer, OnGatewayConnection } from '@nestjs/websockets';

@WebSocketGateway(4001)
export class CrudGateway implements OnGatewayConnection{
    @WebSocketServer() wss;

    handleConnection(client){
        client.emit('connection', 'Fasza csatlakozas');
    }
}