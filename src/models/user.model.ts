import { Sequelize, DataTypes } from 'sequelize';

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

    this.user.associate = (models): void => {
      const { userGroup, group } = models;
      this.user.belongsToMany(group, {through: userGroup});
    }

  }
}
