import { Sequelize, DataTypes } from 'sequelize';

export default class UserGroupModel {
  public userGroup;

  constructor( public db: Sequelize) {
    this.createUserGroupModel();

    return this.userGroup;
  }

  createUserGroupModel(): void {
    this.userGroup = this.db.define('userGroups', {
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
      },
    });

  }

}
