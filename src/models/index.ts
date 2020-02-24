import { groupModelInstance } from './group.model';
import { userModelInstance } from './user.model';
// import { userGroupModelInstance } from './user-group.model';


export const models = {
  user: userModelInstance,
  group: groupModelInstance,
  // userGroup: userGroupModelInstance
};

// userModelInstance.belongsToMany(groupModelInstance, { through: 'UserGroup' });
// groupModelInstance.belongsToMany(userModelInstance, { through: 'UserGroup' });