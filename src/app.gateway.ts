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
  connectedClients: Map<number, any> = new Map();

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
    this.connectedClients.set(client.handshake.query.Id, params);
    console.log(this.connectedClients);
  }

  handleDisconnect(client: Socket) {
    Logger.error(`Client Disconnected: ${client.id}`);
    this.connectedClients.delete(client.handshake.query.Id);
    console.log(this.connectedClients);
  }

  @SubscribeMessage('SendOrder')
  handleMessage(client: Socket, payload: any): WsResponse<string> {
    Logger.log(`order received from ${client.id} `);
    this.wss.to(this.connectedClients.get(payload.restaurantId).socketId).emit('ReceiveOrder', payload);
    return {
      event: 'OrderSent',
      data: 'order has been sent Successfully',
    };
  }
}
