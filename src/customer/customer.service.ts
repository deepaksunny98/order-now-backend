import { Injectable } from '@nestjs/common';
import { Restaurants } from './../database/entity/Restaurants';
import { Menu } from './../database/entity/Menu';
import { Orders } from './../database/entity/Orders';

@Injectable()
export class CustomerService {
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
}
