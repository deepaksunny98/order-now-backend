import { Injectable } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import {
  Restaurants,
  Menu,
  Orders,
  Users,
  Tables,
  OrderItems,
} from './../database/entity';
import { CustomerLoginInput, BookingInput, CartItems } from './../models';
import { MoreThanOrEqual } from 'typeorm';
import { AppGateway } from './../app.gateway';

@Injectable()
export class CustomerService {
  private readonly privateKey = 'ordernow';

  constructor(private appGateway: AppGateway) {}

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
      resolve(token);
    });
  }

  async getRestaurants() {
    return await Restaurants.find();
  }

  async getMenubyRestaurantId(id: number) {
    return await Menu.find({ where: { RestaurantId: id } });
  }

  async booktable(bookingInput: BookingInput) {
    // return await Orders.save();
    const order = new Orders();
    order.OrderId = Math.floor(100000 + Math.random() * 900000).toString();
    order.UserId = Number(bookingInput.userId);
    order.RestaurantId = bookingInput.restaurantId;
    order.TableId = await this.getTableId(
      bookingInput.tableDetails.people,
      bookingInput.restaurantId,
    );
    order.Amount = this.getTotalAmount(bookingInput.cartItems);
    order.OrderDateTime = new Date();
    order.Name = `${bookingInput.firstName} ${bookingInput.lastName || ''}`;
    order.PhoneNumber = bookingInput.tableDetails.phoneNumber;
    const table = new Tables();
    table.TableId = order.TableId;
    table.Status = 'RES';
    await Tables.save(table);
    const savedOrder = await Orders.save(order);
    await this.saveOrderItems(savedOrder.OrderId, bookingInput.cartItems);
    this.appGateway.SendOrder({
      restaurantId: bookingInput.restaurantId,
      orderId: savedOrder.OrderId,
      name: savedOrder.Name,
    });
    return { success: true };
  }

  async saveOrderItems(OrderId: string, cartItems: CartItems[]) {
    for (const obj of cartItems) {
      const orderItem = new OrderItems();
      orderItem.OrderId = OrderId;
      orderItem.MenuId = obj.MenuId;
      orderItem.Quantity = obj.addtocart;
      orderItem.Amount = obj.totalprice;
      orderItem.Name = obj.Name;
      await OrderItems.save(orderItem);
    }
  }

  async getTableId(tableSize: number, restaurantId: number) {
    const tableRes = await Tables.findOne({
      where: { RestaurantId: restaurantId, Size: MoreThanOrEqual(tableSize) },
    });
    return tableRes.TableId;
  }

  getTotalAmount(cartItems: CartItems[]) {
    return cartItems.reduce((a, b) => +a + +b.totalprice, 0);
  }

  async getFreeTablesListByRestId(RestaurantId: number) {
    const tablesList = await Tables.find({
      where: { Status: 'Free', RestaurantId },
    });
    const unique = [...new Set(tablesList.map(item => item.Size))];
    return unique.sort();
  }
}
