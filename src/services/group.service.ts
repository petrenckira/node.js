import { GroupInterface } from '../interfaces/group.interface';
// import { groupModelInstance } from './../models/group.model';
import { Model} from 'sequelize';
import { models } from './../models';


export default class GroupService {

  constructor(public groupModel: any, public userService: any) {
  }

  async createGroup(groupData: GroupInterface): Promise<Model> {
    return this.groupModel.create(groupData)
           .then(res => res)
           .catch(e => console.log(e));
  }

  async getGroups(): Promise <Array<Model>> {
    return this.groupModel.findAll({include: 'users'})
           .then(res => res)
           .catch(e => console.log(e));
  }

  async getGroupById(groupId: string): Promise<any> {
    return this.groupModel.findByPk(groupId)
         .then(group => group.toJSON())
         .catch(e => console.log(e));
  }

  async updateGroup(newGroupData: GroupInterface): Promise<GroupInterface> {
    return this.groupModel.update(newGroupData, {returning: true, where: {id: newGroupData.id}})
           .then(([rowsUpdate, [updatedGroup]]) => {
             return updatedGroup.toJSON();
           })
           .catch(e => console.log(e));
  }

  async removeGroup(groupId: string): Promise <boolean> {
    return this.groupModel.destroy({
        returning: true,
        where:{
          id: groupId
        }
      }).then(()=> true)
        .catch(e => console.log(e));
  }

  addUsersToGroup(groupId: string, userIds: Array<string>): Promise <GroupInterface> {
    return this.groupModel.findOne({
      where: {
        id: groupId
      }
    }).then(group => {
      console.log(group);
      console.log(group.get());
      return group.setUsers(userIds).catch(e => console.log(e))
    })
    .catch(e => console.log(e));
  }

 }

export const groupServiceInstance = new GroupService(models.group, models.user);