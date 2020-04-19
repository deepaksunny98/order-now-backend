import { Controller, Post, Body, Get, Query } from '@nestjs/common';
import { ApiImplicitQuery } from '@nestjs/swagger';
import { CustomerService } from './customer.service';
import { CustomerLoginInput, BookingInput } from './../models';

@Controller('customer')
export class CustomerController {
  constructor(private readonly service: CustomerService) {}

  @Post('login')
  async login(@Body() input: CustomerLoginInput) {
    return await this.service.login(input);
  }

  @Post('booking')
  async booktable(@Body() bookingInput: BookingInput) {
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
