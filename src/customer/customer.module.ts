import { Module } from '@nestjs/common';
import { CustomerController } from './customer.controller';
import { CustomerService } from './customer.service';
import { AppGateway } from './../app.gateway';

@Module({
  controllers: [CustomerController],
  providers: [CustomerService, AppGateway]
})
export class CustomerModule {}
