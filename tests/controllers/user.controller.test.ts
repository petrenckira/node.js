import { dbInstance } from '../../src/data-access/database';
import App from '../../src/app';
import UserController from '../../src/controllers/user.controller';
import * as request from 'supertest';
import * as SequelizeMock from 'sequelize-mock'

const inputUser = {
  id:1,
  login: "petrenckira",
  password: "password123",
  age: 22,
  isDeleted: false
};

const user = {
  ...inputUser,
  createdAt: '2019-06-03 13:13:45',
  updatedAt: '2019-06-03 13:13:45'
}

const DBConnectionMock = new SequelizeMock();
const UserModel = DBConnectionMock.define('user');
UserModel.$queueResult([
  UserModel.build(user)
]);
const userController = new UserController(UserModel);
const app = new App({
              port: '3000',
              controllers: [
                userController
              ],
              db: dbInstance
});

describe('The User Controller', () => {
  describe('GET /users', () => {
    describe('if the config is empty', () => {
      it('response should send users list and code 200', () => {

        return request(app.getServer())
          .get('/users')
          .expect(200)
      })
    })
  })

  describe('DELETE /users', () => {
    describe('if the user exists', () => {
      it('response should send code 200 and message', () => {
        const message ='User was deleted';
        return request(app.getServer())
          .del('/users/1')
          .expect(200)
          .expect(message)
      })

    })
  })
});