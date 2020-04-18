import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Delete,
  Query,
  HttpException,
  HttpStatus,
  Put,
} from '@nestjs/common';
import { ApiImplicitParam, ApiImplicitQuery } from '@nestjs/swagger';
import { AdminService } from './admin.service';
import {
  RestaurantRegisterInput,
  MenuInput,
  UpdateMenuInput,
  TablePostInput,
  TableUpdateInput,
} from './../models';
import { Tables, Menu } from './../database/entity';

@Controller('admin')
export class AdminController {
  constructor(private service: AdminService) {}

  @Post('login')
  async login(@Body() input: RestaurantRegisterInput) {
    try {
      return await this.service.login(input);
    } catch (err) {
      throw new HttpException(
        {
          status: HttpStatus.UNAUTHORIZED,
          error: 'Invalid Username or Password ',
        },
        HttpStatus.UNAUTHORIZED,
      );
    }
  }

  @Post('register')
  async register(@Body() input: RestaurantRegisterInput) {
    try {
      return await this.service.register(input);
    } catch (err) {
      throw new HttpException(
        {
          status: HttpStatus.CONFLICT,
          error: 'Email Already Exists',
        },
        HttpStatus.CONFLICT,
      );
    }
  }

  @Get('getRestaurantByUserId')
  @ApiImplicitQuery({
    name: 'userId',
    required: true,
  })
  async getRestaurantByUserId(@Query('userId') userId) {
    return await this.service.getRestaurantByUserId(userId);
  }

  @Get('getMyMenu')
  @ApiImplicitQuery({
    name: 'restaurantId',
    required: true,
  })
  async getMyMenu(@Query('restaurantId') restaurantId) {
    const items = await this.service.getMenubyRestaurantId(restaurantId);
    return items.reduce((r, a) => {
      r[a.Type] = [...(r[a.Type] || []), a];
      return r;
    }, {});
  }

  @Post('menu')
  async createMenu(@Body() menuInput: MenuInput) {
    return await this.service.saveMenu(menuInput);
  }

  @Put('menu')
  async updateMenu(@Body() menuInput: UpdateMenuInput) {
    return await this.service.updateMenu(menuInput);
  }

  @Delete('menu/:id')
  @ApiImplicitParam({ name: 'id', required: true })
  async deleteMenu(@Param('id') menuId) {
    return await Menu.delete(menuId);
  }

  @Get('getTablesByResId')
  @ApiImplicitQuery({
    name: 'restaurantId',
    required: true,
  })
  async getRestaurant(@Query('restaurantId') restaurantId: number) {
    return await this.service.getTables(restaurantId);
  }

  @Post('tables')
  async createTable(@Body() tableInput: TablePostInput) {
    return await this.service.addTable(tableInput);
  }

  @Put('tables')
  async updateTable(@Body() tableInput: TableUpdateInput) {
    return await this.service.updateTable(tableInput);
  }

  @Delete('tables/:id')
  @ApiImplicitParam({ name: 'id', required: true })
  async deleteTable(@Param('id') tableId) {
    return await Tables.delete(tableId);
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
