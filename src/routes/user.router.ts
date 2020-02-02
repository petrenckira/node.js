import { Router } from 'express';
import { createValidator } from 'express-joi-validation';

import * as userList from '../data/users.json';
import UserController from '../controllers/user.controller';
import { userSchema } from '../validations/user.validation';
import { userServiceInstance } from '../services/user.service';

const userRouter = Router();
const validator = createValidator({});
const userController = new UserController(userServiceInstance);

userRouter.get('/autoSuggest', userController.getAutoSuggestUsers.bind(userController))
      .get('/:id', userController.getUserById.bind(userController))
      .get('/', userController.getAllUsers.bind(userController))
      .post('/', validator.body(userSchema), userController.createUser.bind(userController))
      .put('/', validator.body(userSchema), userController.updateUser.bind(userController))
      .delete('/:id', userController.removeUser.bind(userController));

export default userRouter;