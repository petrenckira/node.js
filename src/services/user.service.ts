import { UserInterface } from '../interfaces/user.interface';
// import { userModelInstance } from '../models/user.model';
import { Model, Op} from 'sequelize';

import { models } from './../models';

const defaultUser = {
  "login": "petrenckira",
  "password": "password123",
  "age": 22,
  "isDeleted": false
};

export default class UserService {

  constructor(public userModel: any) {
  }

  async createDefaultUser(): Promise<Model> {
    try {
      const user = await this.userModel.create(defaultUser);
      console.log('success', user.toJSON());
      return user;
    } catch (err) {
      console.log(err);
    }
  }

  async createUser(userData: UserInterface): Promise<Model> {
    return await this.userModel.create(userData);
  }

  async getUsers(config?: { loginSubstring?: string; limit?: number }): Promise<Array<UserInterface>> {
    const userList = [];
    let options: any = { include: 'groups'};
    if (config) {
     options = {
        where: {
          login:
          {
            [Op.like]: '%' + config.loginSubstring + '%'
          }
        },
        limit: config.limit,
        include: 'groups'
      };
    }

    try {
      const users = await this.userModel.findAll(options);
      users.map((user) => userList.push(user.toJSON()));
      console.log(userList);
      return userList;
    } catch (err) {
      console.log(err);
    }
    
  }

  async getUserById(userId: string): Promise<any> {
    try {
      const user = await this.userModel.findByPk(userId, {include: 'groups'});
      return user.toJSON();
    } catch (err) {
      console.log(err);
    }
  }

  async updateUser(newUserData: UserInterface): Promise<UserInterface> {
    try {
      const [rowsUpdate, [updatedUser]] = await this.userModel.update(newUserData, {returning: true, where: {id: newUserData.id}});
      return updatedUser.toJSON();
    } catch (err) {
      console.log(err);
    }
  }

  async removeUser(userId: string): Promise <boolean> {
    try {
      await this.userModel.destroy({
        returning: true,
        where:{
          id: userId
        }
      });
      return true;
    } catch (err) {
      console.log(err);
    }
  }
 }

export const userServiceInstance = new UserService(models.user);