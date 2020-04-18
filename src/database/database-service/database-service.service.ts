import { Injectable, OnModuleInit, Logger } from '@nestjs/common';
import { createConnection } from 'typeorm';
import { Restaurants } from '../entity/Restaurants';
import { Orders } from '../entity/Orders';
import { Tables } from '../entity/Tables';
import { Menu } from '../entity/Menu';
import { Users } from '../entity/Users';
// import { CacheService } from 'src/cache-service/cache-service.service';
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
      logging: true,
      entities: [Restaurants, Orders, Tables, Menu, Users],
    })
      .then(connectionEstablished => {
        Logger.log('DB Connection Established: ' + connectionEstablished.isConnected);
      })
      .catch(async connectionError => {
        Logger.error('Error while connection to DB', connectionError);
      });
  }
}
