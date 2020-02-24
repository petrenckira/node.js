import { Sequelize, DataTypes } from 'sequelize';
import { dbInstance } from './../data-access/database';
import { models } from './index';
export default class GroupModel {
  public group;

  constructor( public db: Sequelize) {
    this.createGroupModel();

    return this.group;
  }

  createGroupModel(): void {
    this.group = this.db.define('group', {
      id: {
        type: DataTypes.UUID,
        defaultValue:DataTypes.UUIDV4,
        unique: true,
        primaryKey: true
      },
      name: {
        type: DataTypes.STRING,
      },
      permission: {
        type: DataTypes.ARRAY(DataTypes.STRING),
      }
    });

    // this.group.associate = (): void=> {
    //   this.group.belongsToMany(models.user, { as: 'users_in_group', through: models.userGroup, foreignKey: 'group_id'});
    // }

  }

}

export const groupModelInstance = new GroupModel(dbInstance);
