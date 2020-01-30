import UserModel from '../models/user.model';
import { UserInterface } from '../interfaces/user.interface';
import { userModelInstance } from './../models/user.model';

export default class UserService {

  constructor(public userModel: any) {
  }

  async createUser(userData: UserInterface): Promise<any> {
    return await this.userModel.create(userData);
  }

  async getAllUsers(): Promise<any> {
    return await this.userModel.findAll();
  }
}

export const userServiceInstance = new UserService(userModelInstance);