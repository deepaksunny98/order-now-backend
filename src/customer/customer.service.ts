import { Injectable } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { Restaurants, Menu, Orders, Users, Tables } from './../database/entity';
import { CustomerLoginInput } from './../models';

@Injectable()
export class CustomerService {
  private readonly privateKey = 'ordernow';

  async login(input: CustomerLoginInput) {
    const userDetails = await Users.findOne({
      where: { Mobile: input.Mobile },
    });
    if (!!userDetails) {
      const token = await this.generateJWT(userDetails);
      return { token };
    } else {
      const user = new Users();
      user.Mobile = input.Mobile;
      user.Type = 'Customer';
      const savedRes = await Users.save(user);
      const token = await this.generateJWT(savedRes);
      return { token };
    }
  }

  async generateJWT(userDetails) {
    return new Promise(resolve => {
      const token = jwt.sign({ ...userDetails }, this.privateKey);
      console.log(token);
      resolve(token);
    });
  }

  async getRestaurants() {
    return await Restaurants.find();
  }

  async getMenubyRestaurantId(id: number) {
    return await Menu.find({ where: { RestaurantId: id } });
  }

  async booktable(bookingInput) {
    bookingInput.MenuId =
      bookingInput.MenuId.length > 0 ? bookingInput.MenuId : null;
    return await Orders.save(bookingInput);
  }

  async getFreeTablesListByRestId(RestaurantId: number) {
    const tablesList = await Tables.find({
      where: { Status: 'Free', RestaurantId },
    });
    console.log(tablesList);
  }
}
