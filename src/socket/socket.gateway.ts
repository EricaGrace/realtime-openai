// back-end/src/app.gateway.ts
import { WebSocketGateway, WebSocketServer, OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway()
export class SocketGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server: Server;

  handleConnection(client: any, ...args: any[]) {
    console.log(`Client connecté : ${client.id}`);
  }

  handleDisconnect(client: any) {
    console.log(`Client déconnecté : ${client.id}`);
  }

  handleMessage(client: any, message: string): void {
    // Traitement du message et émission à tous les clients
    this.server.emit('messageFromServer', `Serveur : ${message}`);
  }
}
