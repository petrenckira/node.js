import { Sequelize, DataTypes } from 'sequelize';

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

    this.group.associate = (models): void => {
      const { userGroup, user } = models;
      this.group.belongsToMany(user, { through: userGroup});
    }
  }

}
