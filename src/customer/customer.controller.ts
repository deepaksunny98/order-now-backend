import { Controller, Post, Body, Get, Query } from '@nestjs/common';
import { ApiImplicitBody, ApiImplicitQuery } from '@nestjs/swagger';
import { Orders } from './../database/entity/Orders';
import { CustomerService } from './customer.service';

@Controller('customer')
export class CustomerController {
  constructor(private readonly service: CustomerService) {}

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
    description: 'number',
    required: true,
  })
  async getMenubyRestaurantId(@Query('restaurantId') restaurantId) {
    const items = await this.service.getMenubyRestaurantId(restaurantId);
    return items;
  }
}
