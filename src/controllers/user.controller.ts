import { Request, Response, Router } from 'express';
import { createValidator } from 'express-joi-validation';
import { userSchema } from '../validations/user.validation';

import UserService from '../services/user.service';
import { HttpError } from '../helpers/error-handler';
import { models } from './../models'
import AuthController from './auth.controller';
import { Model } from 'sequelize/types';
// import { authController } from './../controllers/auth.controller';


export default class UserController {

  public path = '/users';
  public router = Router();
  public validator = createValidator({});
  private userService: UserService;
  private authController: AuthController;


  constructor( public userModel) {
    this.userService = new UserService(userModel);
    this.authController = new AuthController(this.userService);
    this.initRoutes();
  }

  public initRoutes(): void {
    const userRouter = Router();
    userRouter.get('/autoSuggest', this.getAutoSuggestUsers)
    .get('/:id', this.getUserById)
    .get('/', this.getAllUsers)
    .post('/', this.validator.body(userSchema), this.createUser)
    .put('/', this.validator.body(userSchema), this.updateUser)
    .delete('/:id', this.removeUser);

    // this.router.use('/users', this.authController.checkJWT, userRouter);
    this.router.use(this.path, userRouter);

  }

  getAllUsers = (req: Request, res: Response, next): void => {
    this.userService.getUsers().then((userList) => {
      res.json(userList);
    }).catch(error => {
      next(error);
    });
  }

  getUserById = (req: Request, res: Response, next): void => {
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

  createUser = (req: Request, res: Response, next): void => {
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

  updateUser = (req: Request, res: Response, next): void => {
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

  removeUser = (req: Request, res: Response, next): void => {
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

  getAutoSuggestUsers = (req: Request, res: Response, next): void => {
    const config = req.query;
    this.userService.getUsers(config).then((suggestUsers) => {
      res.json(suggestUsers)
    }).catch(error => {
      next(error);
    });
  };
}