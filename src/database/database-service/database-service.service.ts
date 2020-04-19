import { Injectable, OnModuleInit, Logger } from '@nestjs/common';
import { createConnection } from 'typeorm';
import {
  Restaurants,
  Orders,
  Tables,
  Menu,
  Users,
  OrderItems,
} from '../entity';

@Injectable()
export class DatabaseServiceService implements OnModuleInit {
  constructor() {}
  async onModuleInit() {
    await createConnection({
      type: 'mysql',
      host: 'ordernowdbserver.cgg8rgu76jp5.ca-central-1.rds.amazonaws.com',
      port: 3306,
      username: 'admin',
      password: 'admin123',
      database: 'OrderNow',
      synchronize: false,
      logging: false,
      entities: [Restaurants, Orders, Tables, Menu, Users, OrderItems],
    })
      .then(connectionEstablished => {
        Logger.log(
          'DB Connection Established: ' + connectionEstablished.isConnected,
        );
      })
      .catch(async connectionError => {
        Logger.error('Error while connection to DB', connectionError);
      });
  }
}
