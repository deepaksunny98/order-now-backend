import { Controller, Post, Body, Get, Query } from '@nestjs/common';
import { ApiImplicitBody, ApiImplicitQuery } from '@nestjs/swagger';
import { CustomerService } from './customer.service';
import { Orders } from './../database/entity';
import { CustomerLoginInput } from './../models';

@Controller('customer')
export class CustomerController {
  constructor(private readonly service: CustomerService) {}

  @Post('login')
  async login(@Body() input: CustomerLoginInput) {
    return await this.service.login(input);
  }

  @Post('booking')
  @ApiImplicitBody({ name: 'bookingInput', type: Orders })
  async booktable(@Body() bookingInput) {
    return await this.service.booktable(bookingInput);
  }

  @Get('getRestaurants')
  async getRestaurants() {
    return await this.service.getRestaurants();
  }

  @Get('getMenubyRestaurantId')
  @ApiImplicitQuery({
    name: 'restaurantId',
    required: true,
  })
  async getMenubyRestaurantId(@Query('restaurantId') restaurantId) {
    return await this.service.getMenubyRestaurantId(restaurantId);
  }

  @Get('freeTablesListByRestId')
  @ApiImplicitQuery({
    name: 'restaurantId',
    required: true,
  })
  async getFreeTablesListByRestId(@Query('restaurantId') restaurantId) {
    return await this.service.getFreeTablesListByRestId(restaurantId);
  }
}
