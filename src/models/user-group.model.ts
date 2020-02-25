import { Sequelize, DataTypes } from 'sequelize';
import { dbInstance } from './../data-access/database';
import { models } from '../models';

export default class UserGroupModel {
  public userGroup;

  constructor( public db: Sequelize) {
    this.createUserGroupModel();

    return this.userGroup;
  }

  createUserGroupModel(): void {
    this.userGroup = this.db.define('userGroup', {
      id: {
        type: DataTypes.UUID,
        defaultValue:DataTypes.UUIDV4,
        unique: true,
        primaryKey: true
      },
      groupId: {
        type: DataTypes.UUID,
        references: {
          model: 'group',
          key: 'id'
        },
        onDelete: 'cascade',
        onUpdate: 'cascade',
      },
      userId: {
        type: DataTypes.UUID,
        references: {
          model: 'user',
          key: 'id'
        },
        onDelete: 'cascade',
        onUpdate: 'cascade',
      }
    });

    this.userGroup.associate = (): void => {
      this.userGroup.belongsTo(models.user, { foreignKey: 'id', targetKey: 'userId', as: 'user' });
      this.userGroup.belongsTo(models.group, { foreignKey: 'id', targetKey: 'groupId', as: 'group' });
    }

  }

}

export const userGroupModelInstance = new UserGroupModel(dbInstance);
