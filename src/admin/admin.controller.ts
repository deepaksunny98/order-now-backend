import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Delete,
  Query,
} from '@nestjs/common';
import { Tables } from './../database/entity/Tables';
import { Menu } from './../database/entity/Menu';
import {
  ApiImplicitBody,
  ApiImplicitParam,
  ApiImplicitQuery,
} from '@nestjs/swagger';
import { AdminService } from './admin.service';
import { RestaurantRegisterInput } from './../models/RestaurantRegisterInput.model';

@Controller('admin')
export class AdminController {
  constructor(private service: AdminService) {}

  @Post('login')
  // @ApiImplicitBody({ name: 'input', type: Users })
  async login(@Body() input) {
    console.log('input --> ', input);
  }

  @Post('register')
  async register(@Body() input: RestaurantRegisterInput) {
    return await this.service.register(input);
  }

  @Get('getMyMenu')
  @ApiImplicitQuery({
    name: 'restaurantId',
    description: 'number',
    required: true,
  })
  async getMyMenu(@Query('restaurantId') restaurantId) {
    const items = await this.service.getMenubyRestaurantId(restaurantId);
    return items.reduce((r, a) => {
      r[a.Type] = [...(r[a.Type] || []), a];
      return r;
    }, {});
  }

  @Get('getTablesByResId')
  @ApiImplicitQuery({
    name: 'restaurantId',
    required: true,
  })
  async getRestaurant(@Query() restaurantId: number) {
    return await this.service.getTables(restaurantId);
  }

  @Post('menu')
  @ApiImplicitBody({ name: 'menuInput', type: Menu })
  async createMenu(@Body() menuInput) {
    return await Menu.save(menuInput);
  }

  @Post('tables')
  @ApiImplicitBody({ name: 'tableInput', type: Tables })
  async createTable(@Body() tableInput) {
    return await Tables.save(tableInput);
  }
  @Delete('menu/:id')
  @ApiImplicitParam({ name: 'id', description: 'number', required: true })
  async deleteMenu(@Param() menuId) {
    return await Menu.delete(menuId.id);
  }
  @Delete('tables/:id')
  @ApiImplicitParam({ name: 'id', description: 'number', required: true })
  async deleteTable(@Param() tableId) {
    return await Tables.delete(tableId.id);
  }

  // @Post('login')
  // @ApiImplicitBody({ name: 'input', type: Users })
  // async login(@Body() input) {
  //   try {
  //     const saveRes = await Users.save(input);
  //     const otpRes = await this.sendOTP({
  //       phoneNumber: '+91' + input.Mobile.slice(-10),
  //     });
  //     return { UserId: saveRes.UserId, ...otpRes };
  //   } catch (error) {
  //     return error;
  //   }
  // }
  // @Get('order/:orderId')
  // @ApiImplicitParam({ name: 'orderId', description: 'number', required: true })
  // async getOrders(@Param() orderId) {
  //   const order = await Orders.findOne({ UserId: orderId.orderId });
  //   const restaurant = await Restaurants.findOne({
  //     RestaurantId: order.RestaurantId,
  //   });
  //   const table = await Tables.findOne({ TableId: order.TableId });
  //   const menu = await createQueryBuilder()
  //     .select()
  //     .from(Menu, 'M')
  //     .where('MenuId In (:...id)', { id: JSON.parse(order.MenuId) })
  //     .execute();
  //   return { order, restaurant, table, menu };
  // }
  // async sendOTP(input) {
  //   try {
  //     const axiosRes = await Axios.post(
  //       'https://o3ml8d8b59.execute-api.ap-south-1.amazonaws.com/dev/get-otp',
  //       input,
  //     );
  //     return axiosRes.data;
  //   } catch (error) {
  //     return error;
  //   }
  // }
  // @Get('orderByResId/:ResId')
  // @ApiImplicitParam({ name: 'ResId', description: 'number', required: true })
  // async getOrdersRes(@Param() ResId) {
  //   const order = await Orders.findOne({ RestaurantId: ResId.ResId });
  //   const menu = await createQueryBuilder()
  //     .select()
  //     .from(Menu, 'M')
  //     .where('MenuId In (:...id)', { id: JSON.parse(order.MenuId) })
  //     .execute();
  //   return { order, menu };
  // }
}
