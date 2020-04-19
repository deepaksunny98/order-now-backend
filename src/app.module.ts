import { Module, NestModule, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AdminModule } from './admin/admin.module';
import { DatabaseServiceService } from './database/database-service/database-service.service';
import { AppGateway } from './app.gateway';
import { CustomerModule } from './customer/customer.module';
import { AuthMiddleware } from './auth.middleware';
import { CustomerController } from './customer/customer.controller';
import { AdminController } from './admin/admin.controller';

@Module({
  imports: [AdminModule, CustomerModule],
  controllers: [AppController],
  providers: [AppService, DatabaseServiceService, AppGateway],
})
export class AppModule implements NestModule {
  configure(consumer: import('@nestjs/common').MiddlewareConsumer) {
    // consumer
    //   .apply(AuthMiddleware)
    //   .exclude(
    //     { path: 'admin/login', method: RequestMethod.POST },
    //     { path: 'admin/register', method: RequestMethod.POST },
    //     { path: 'customer/login', method: RequestMethod.POST },
    //   )
    //   .forRoutes(AdminController, CustomerController);
  }
}
