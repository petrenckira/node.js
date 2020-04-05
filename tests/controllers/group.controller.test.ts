import { dbInstance } from '../../src/data-access/database';
import App from '../../src/app';
import GroupController from '../../src/controllers/group.controller';
import * as request from 'supertest';
// import * as SequelizeMock from 'sequelize-mock'

const group = {
  "id": "ef7fc2c4-ee02-41e0-9c9f-960160441c2c",
  "name": "N-permission Group",
  "permission": [
      "READ"
  ],
  "createdAt": "2020-02-26T17:37:02.953Z",
  "updatedAt": "2020-02-26T17:37:02.953Z",
  "users": [],
};

const user = {
  id:'ef7fc2c4-ee02-41e0-9c9f-960160441c2r',
  login: "petrenckira",
  password: "password123",
  age: 22,
  isDeleted: false,
  createdAt: '2019-06-03 13:13:45',
  updatedAt: '2019-06-03 13:13:45'
}

const groupModel = {
  findByPk: jest.fn().mockResolvedValueOnce(group),
  findAll: jest.fn().mockResolvedValueOnce(group),
}
const userModel = {};

const groupController = new GroupController(groupModel, userModel);
const app = new App({
              port: '3000',
              controllers: [
                groupController
              ],
              db: dbInstance
});

describe('The Group Controller', () => {
  describe('GET /groups', () => {
    describe('if all is ok', () => {
      it('response should send code 200', () => {

        return request(app.getServer())
          .get('/groups')
          .expect(200)
      })
    })
  })


  //it doesn't work
    describe('GET /groups/:id', () => {
      describe('if all is ok', () => {
        it('response should send group and code 200', () => {
  
          return request(app.getServer())
            .get('/groups/ef7fc2c4-ee02-41e0-9c9f-960160441c2c')
            .expect(200)
        })
      })
  })
});