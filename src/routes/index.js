import Router from 'express';
import { createValidator } from 'express-joi-validation';

import User from '../models/user.model';
import * as userList from '../data/users.json';
import UserController from '../controllers/user.controller';
import { userSchema } from '../validations/user.validation';

const router = Router();
const validator = createValidator({});
const userController = new UserController(userList);

router.get('/', userController.getAllUsers.bind(userController))
      .get('/autoSuggest', userController.getAutoSuggestUsers.bind(userController))
      .get('/:id', userController.getUserById.bind(userController))
      .post('/', validator.body(userSchema), userController.createUser.bind(userController))
      .put('/', validator.body(userSchema), userController.updateUser.bind(userController))
      .delete('/:id', userController.removeUser.bind(userController));

export default router;