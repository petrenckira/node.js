import Router from 'express';
import User from '../models/user.model';
import * as userList from '../data/users.json';
import UserController from '../controllers/user.controller';

const router = Router();
const userController = new UserController(userList);

router.get('/', userController.getAllUsers.bind(userController))
      .get('/autoSuggest', userController.getAutoSuggestUsers.bind(userController))
      .get('/:id', userController.getUserById.bind(userController))
      .post('/', userController.createUser.bind(userController))
      .put('/', userController.updateUser.bind(userController))
      .delete('/:id', userController.removeUser.bind(userController));

export default router;