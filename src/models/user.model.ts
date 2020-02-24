import { Sequelize, DataTypes } from 'sequelize';
import { dbInstance } from './../data-access/database';
import { models } from '../models';
export default class UserModel {
  public user;

  constructor( public db: Sequelize) {
    this.createUserModel();

    return this.user;
  }

  createUserModel(): void {
    this.user = this.db.define('user', {
      id: {
        type: DataTypes.UUID,
        defaultValue:DataTypes.UUIDV4,
        unique: true,
        primaryKey: true
      },
      login: {
        type: DataTypes.STRING,
      },
      password: {
        type: DataTypes.STRING,
      },
      age: {
        type: DataTypes.NUMBER,
      },
      isDeleted: {
        type: DataTypes.BOOLEAN,
      }
    });

    // this.user.associate = (): void=> {
    //   this.user.belongsToMany(models.group, { as: 'belong_to_groups', through: models.userGroup, foreignKey: 'user_id'});
    // }
  }
}

export const userModelInstance = new UserModel(dbInstance);
