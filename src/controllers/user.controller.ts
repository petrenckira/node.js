import { Request, Response } from 'express';
import UserService from '../services/user.service';
import { HttpError } from '../helpers/error-handler';

export default class UserController {

  constructor(public userService: UserService) {}

  getAllUsers (req: Request, res: Response, next): void {
    this.userService.getUsers().then((userList) => {
      res.json(userList);
    }).catch(error => {
      next(error);
    });
  }

  getUserById (req: Request, res: Response, next): void{
    const {id} = req.params;
    this.userService.getUserById(id).then((user) => {
      if (!user) {
        throw new HttpError(404, 'No user found!' )
      }
        res.send(user);
    }).catch(error => {
      next(error);
    });
  }

  createUser (req: Request, res: Response, next): void {
    const { login, password, age, isDeleted = false} = req.body;
    const user = {
        login,
        password,
        age,
        isDeleted
    };
    this.userService.createUser(user).then((createdUser) => {
      res.send(createdUser);
    }).catch(error => {
      next(error);
    });
  }

  updateUser (req: Request, res: Response, next): void {
    const { id, login, password, age, isDeleted = false} = req.body;
    const newUser = {
        id,
        login,
        password,
        age,
        isDeleted
    };
    this.userService.updateUser(newUser).then((newUser) => {
      if(!newUser) {
        throw new HttpError(404, 'No user found!' )
      }
      res.send(newUser);
    }).catch(error => {
      next(error);
    });
  }

  removeUser (req: Request, res: Response, next): void{
    const {id} = req.params;
    this.userService.removeUser(id).then((oldUser) => {
      if(!oldUser) {
        throw new HttpError(404, 'No user found!' )
      }
      res.send('User was deleted');
    }).catch(error => {
      next(error);
    });
  }

  getAutoSuggestUsers (req: Request, res: Response, next): void {
    const config = req.query;
    this.userService.getUsers(config).then((suggestUsers) => {
      res.json(suggestUsers)
    }).catch(error => {
      next(error);
    });
  };
}