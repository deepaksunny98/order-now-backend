import {
  SubscribeMessage,
  WebSocketGateway,
  OnGatewayInit,
  WsResponse,
  OnGatewayConnection,
  OnGatewayDisconnect,
  WebSocketServer,
} from '@nestjs/websockets';
import { Logger } from '@nestjs/common';
import { Socket, Server } from 'socket.io';

@WebSocketGateway()
export class AppGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  connectedClients: Map<string, string> = new Map();

  @WebSocketServer() wss: Server;

  afterInit(server: Server) {
    Logger.log('Socket Initialized');
  }

  handleConnection(client: Socket, ...args: any[]) {
    Logger.log(`Client Connected: ${client.id}`);
    const params = {
      clientType: client.handshake.query.clientType,
      socketId: client.id,
    };
    this.connectedClients.set(client.id, client.handshake.query.Id);
    console.log(this.connectedClients);
  }

  handleDisconnect(client: Socket) {
    Logger.error(`Client Disconnected: ${client.id}`);
    this.connectedClients.delete(client.id);
    console.log(this.connectedClients);
  }

  // @SubscribeMessage('SendOrder')
  SendOrder(payload: any): WsResponse<string> {
    // Logger.log(`order received from ${client.id} `);
    this.wss.to(this.getByValue(`R${payload.restaurantId}`)).emit('NewOrder', payload);
    return {
      event: 'OrderSent',
      data: 'order has been sent Successfully',
    };
  }

  getByValue(searchValue: string) {
    for (const [key, value] of this.connectedClients.entries()) {
      if (value === searchValue) {
        return key;
      }
    }
  }
}
