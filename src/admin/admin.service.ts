import { Injectable } from '@nestjs/common';
import { Menu } from './../database/entity/Menu';
import { Tables } from './../database/entity/Tables';
import { RestaurantRegisterInput } from './../models/RestaurantRegisterInput.model';
import { Users } from './../database/entity/Users';
import * as bcrypt from 'bcrypt';
@Injectable()
export class AdminService {
  private readonly saltRounds = 10;
  async login(input) {}

  async register(input: RestaurantRegisterInput) {
    try {
      const user = new Users();
      user.Name = input.Name;
      user.Password = await this.getPwdHash(input.Password);
      user.Type = 'Restaurant';
      await Users.insert(user);
    } catch (error) {
      throw new Error(error);
    }
  }

  async getPwdHash(password: string): Promise<string> {
    return new Promise((resolve, reject) => {
      bcrypt.genSalt(this.saltRounds, (error, salt) => {
        if (error) {
          return reject(error);
        }
        bcrypt.hash(password, salt, (err, hash) => {
          if (err) {
            return reject(err);
          }
          resolve(hash);
        });
      });
    });
  }

  async getMenubyRestaurantId(id: number) {
    return await Menu.find({ where: { RestaurantId: id } });
  }

  async getTables(restaurantId: number) {
    return await Tables.find({ RestaurantId: restaurantId });
  }
}
