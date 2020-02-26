import { Request, Response } from 'express';
import { UserInterface } from '../interfaces/user.interface';
import UserService from '../services/user.service';

export default class UserController {

  constructor(public userService: UserService) {}

  getAllUsers (req: Request, res: Response): void {
    this.userService.getUsers().then((userList) => {
      res.json(userList);
    });
  }

  getUserById (req: Request, res: Response): void{
    const {id} = req.params;
    this.userService.getUserById(id).then((user) => {
      //to move to handleError method logic
      if (!user) {
        return res.status(404).send('No user found!');
      }
        res.send(user);
    });
  }

  createUser (req: Request, res: Response): void {
    const { login, password, age, isDeleted = false} = req.body;
    const user = {
        login,
        password,
        age,
        isDeleted
    };
    this.userService.createUser(user).then((createdUser) => {
      res.send(createdUser);
    });
  }

  updateUser (req: Request, res: Response): void {
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
        return res.status(404).send('No user found!');
      }
      res.send(newUser);
    });
  }

  removeUser (req: Request, res: Response): void{
    const {id} = req.params;
    this.userService.removeUser(id).then((oldUser) => {
      if(!oldUser) {
        return res.status(404).send('No user found!');
      }
      res.send('User was deleted');
    });
  }

  getAutoSuggestUsers (req: Request, res: Response): void {
    const config = req.query;
    this.userService.getUsers(config).then((suggestUsers) => {
      res.json(suggestUsers)
    });
  };
}