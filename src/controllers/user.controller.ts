import { Request, Response } from 'express';
import User from '../interfaces/user.model';
import { UserInterface } from '../interfaces/user.interface';
import UserService from '../services/user.service';

export default class UserController {

  constructor(public userList: User [],
              public userService: UserService) {
  }

  getAllUsers (req: Request, res: Response): void {
    const users = this.userService.getAllUsers();
    res.json(users);
  }

  getUserById (req: Request, res: Response): void{
    const {id} = req.params;
    const user = this.userList.find(item => item.id === id);
    if (!user) {
      res.status(404).send('No user found!');
    } else {
      res.send(user);
    }
  }

  createUser (req: Request, res: Response): void {
    const { login, password, age, isDeleted = false} = req.body;
    const user = {
        login,
        password,
        age,
        isDeleted
    };
    this.userService.createUser(user);
    // this.userList.push(user);
    res.send(user);
  }

  updateUser (req: Request, res: Response): void {
    const { id, login, password, age, isDeleted = false} = req.body;
    const newUser = new User (
        login,
        password,
        age,
        isDeleted,
        id
    );
    const oldUser = this.userList.find(item => item.id === newUser.id);

    if(!oldUser) {
      res.status(404).send('No user found!');
    } else {
      oldUser.login = newUser.login; // need to make it clear
      res.send(newUser);
    }
  }

  removeUser (req: Request, res: Response): void{
    const {id} = req.params;
    const oldUser = this.userList.find(item => item.id === id);
    if(!oldUser) {
      res.status(404).send('No user found!');
    } else {
      oldUser.isDeleted = true;
      res.send('User was deleted');
    }
  }

  getAutoSuggestUsers (req: Request, res: Response): void {
    const { loginSubstring, limit = 2 } = req.query;
    const suggestionsList = this.userList.filter(user => user.login.includes(loginSubstring));
    const suggestUsers = suggestionsList.slice(0, limit);
    res.json(suggestUsers)
  };
}