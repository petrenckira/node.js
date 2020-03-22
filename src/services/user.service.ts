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
      const user = await this.userModel.create(defaultUser);
      return user;
  }

  async createUser(userData: UserInterface): Promise<Model> {
    return await this.userModel.create(userData);
  }

  async getUsers(config?: { loginSubstring?: string; limit?: number; isFullLogin?: boolean}): Promise<Array<UserInterface>> {
    const userList = [];
    let options: any = { include: 'groups'};
    if (config) {

      let login: any = {
        [Op.like]: '%' + config.loginSubstring + '%'
      };

      if (config.isFullLogin) {
        login = {
          login: config.loginSubstring
        }
      }

     options = {
        where: login,
        limit: config.limit,
        include: 'groups'
      };
    }

      const users = await this.userModel.findAll(options);
      users.map((user) => userList.push(user.toJSON()));
      console.log(userList);
      return userList;
  }

  async getUserById(userId: string): Promise<any> {
    const user = await this.userModel.findByPk(userId, {include: 'groups'});
    return user.toJSON();

  }

  async getUserByLogin(login: string): Promise<any> {
    const user = await this.userModel.findByPk(login, {include: 'groups'});
    return user.toJSON();

  }

  async updateUser(newUserData: UserInterface): Promise<UserInterface> {
    const [rowsUpdate, [updatedUser]] = await this.userModel.update(newUserData, {returning: true, where: {id: newUserData.id}});
    return updatedUser.toJSON();
  }

  async removeUser(userId: string): Promise <boolean> {
    await this.userModel.destroy({
      returning: true,
      where:{
        id: userId
      }
    });
    return true;
  }
 }

export const userServiceInstance = new UserService(models.user);