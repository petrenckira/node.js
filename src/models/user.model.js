export default class User {
  constructor( login, password, age, isDeleted, id) {
     this.id = id || String(Math.floor(Math.random() * 100000));
     this.login = login;
     this.password = password;
     this.age = age;
     this.isDeleted = isDeleted;
   }
}