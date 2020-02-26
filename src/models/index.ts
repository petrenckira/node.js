import GroupModel from './group.model';
import UserModel from './user.model';
import UserGroupModel from './user-group.model';
import { dbInstance } from './../data-access/database';

export const models = {
  user: new UserModel(dbInstance),
  userGroup: new UserGroupModel(dbInstance),
  group: new GroupModel(dbInstance),
};

Object.keys(models).forEach(modelKey => {
  if ('associate' in models[modelKey]) {
    models[modelKey].associate(models)
  }
})
