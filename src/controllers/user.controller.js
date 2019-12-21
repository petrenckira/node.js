import User from '../models/user.model';
import userList from '../data/users.json';

export default class UserController {
  constructor(userList) {
    this.userList = userList.default;
  }

  getAllUsers (req, res) {
   res.json(this.userList);
  }

  getUserById (req, res) {
    const {id} = req.params;
    const user = this.userList.find(item => item.id === id);
    if (!user) {
      res.status(404).send('No user found!');
    } else {
      res.send(user);
    }
  }

  createUser (req, res) {
    const { login, password, age, isDeleted = false} = req.body;
    const user = new User (
        login,
        password,
        age,
        isDeleted
    );
    this.userList.push(user);
    res.send(user);
  }

  updateUser (req, res) {
    const { id, login, password, age, isDeleted = false} = req.body;
    const newUser = new User (
        login,
        password,
        age,
        isDeleted,
        id
    );
    let oldUser = this.userList.find(item => item.id === newUser.id);
    console.log(oldUser);
    if(!oldUser) {
      res.status(404).send('No user found!');
    } else {
      oldUser.login = newUser.login; // need to make it clear
      res.send(newUser);
    }
  }

  removeUser(req, res) {
    const {id} = req.params;
    let oldUser = this.userList.find(item => item.id === id);
    if(!oldUser) {
      res.status(404).send('No user found!');
    } else {
      oldUser.isDeleted = true;
      res.send('User was deleted');
    }
  }

  getAutoSuggestUsers (req, res) {
    const { loginSubstring, limit = 2 } = req.query;
    const suggestionsList = this.userList.filter(user => user.login.includes(loginSubstring));
    const suggestUsers = suggestionsList.slice(0, limit);
    res.json(suggestUsers)
  };
}