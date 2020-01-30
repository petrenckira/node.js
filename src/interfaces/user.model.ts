export default class User {

  public id: string;
  public login: string;
  public password: string;
  public age: number;
  public isDeleted: boolean;

  constructor( login, password, age, isDeleted, id?) {
     this.id = id || String(Math.floor(Math.random() * 100000));
     this.login = login;
     this.password = password;
     this.age = age;
     this.isDeleted = isDeleted;
   }
}