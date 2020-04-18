import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { Menu, Tables, Users, Restaurants } from './../database/entity';
import {
  RestaurantRegisterInput,
  MenuInput,
  UpdateMenuInput,
  TablePostInput,
  TableUpdateInput,
} from './../models';

@Injectable()
export class AdminService {
  private readonly saltRounds = 10;
  private readonly privateKey = 'ordernow';

  async login(input: RestaurantRegisterInput) {
    const userDetails = await Users.findOne({
      where: { Email: input.Email },
    });
    if (userDetails) {
      if (await this.isPasswordValid(input.Password, userDetails.Password)) {
        delete userDetails.Password;
        const token = await this.generateJWT(userDetails);
        return { token };
      } else {
        throw new Error();
      }
    } else {
      throw new Error();
    }
  }

  async generateJWT(userDetails) {
    return new Promise(resolve => {
      const token = jwt.sign({ ...userDetails }, this.privateKey);
      resolve(token);
    });
  }

  async isPasswordValid(myPlaintextPassword: string, passwordHash: string) {
    return new Promise(resolve => {
      bcrypt.compare(myPlaintextPassword, passwordHash, (err, result) => {
        if (err) {
          resolve(false);
        } else {
          resolve(result);
        }
      });
    });
  }

  async register(input: RestaurantRegisterInput) {
    try {
      const userDetails = await Users.findOne({
        where: { Email: input.Email },
      });
      if (userDetails) {
        throw new Error('Email Already Exists');
      }
      const user = new Users();
      user.Email = input.Email;
      user.Password = await this.getPwdHash(input.Password);
      user.Type = 'Restaurant';
      await Users.save(user);
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

  async getRestaurantByUserId(userId: number) {
    return await Restaurants.findOne({ where: { userId } });
  }

  async getMenubyRestaurantId(id: number) {
    return await Menu.find({ where: { RestaurantId: id } });
  }

  async getTables(restaurantId: number) {
    return await Tables.find({ where: { RestaurantId: restaurantId } });
  }

  async saveMenu(menuInput: MenuInput) {
    const menu = new Menu();
    menu.Amount = menuInput.Amount;
    menu.ImageUrl = menuInput.ImageUrl;
    menu.Name = menuInput.Name;
    menu.PreparationTime = menuInput.PreparationTime;
    menu.RestaurantId = menuInput.RestaurantId;
    menu.Type = menuInput.Type;
    const saveRes = await Menu.save(menu);
    return saveRes;
  }

  async updateMenu(menuInput: UpdateMenuInput) {
    const menu = new Menu();
    menu.MenuId = menuInput.MenuId;
    menu.Amount = menuInput.Amount;
    menu.ImageUrl = menuInput.ImageUrl;
    menu.Name = menuInput.Name;
    menu.PreparationTime = menuInput.PreparationTime;
    menu.RestaurantId = menuInput.RestaurantId;
    menu.Type = menuInput.Type;
    const saveRes = await Menu.save(menu);
    return saveRes;
  }

  async addTable(tableInput: TablePostInput) {
    const table = new Tables();
    table.RestaurantId = tableInput.RestaurantId;
    table.Size = tableInput.Size;
    table.Status = 'Free';
    table.TableNo = tableInput.TableNo;
    table.Time = 0;
    const saveRes = await Tables.save(table);
    return saveRes;
  }

  async updateTable(tableInput: TableUpdateInput) {
    const table = new Tables();
    table.TableId = tableInput.TableId;
    table.RestaurantId = tableInput.RestaurantId;
    table.Size = tableInput.Size;
    table.Status = tableInput.Status;
    table.TableNo = tableInput.TableNo;
    table.Time = tableInput.Time;
    const saveRes = await Tables.save(table);
    return saveRes;
  }
}
