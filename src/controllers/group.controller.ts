import { Request, Response } from 'express';
import GroupService from '../services/group.service';
import { HttpError } from '../helpers/error-handler';



export default class GroupController {

  constructor(public groupService: GroupService) {}

  getAllGroups (req: Request, res: Response, next): void {
    this.groupService.getGroups().then((groupList) => {
      if(!groupList) {
        throw new HttpError(404,'No group found!');
      }
      res.send(groupList);
    }).catch(error => {
      next(error);
    });
  }

  getGroupById (req: Request, res: Response, next): void{
    const {id} = req.params;
    this.groupService.getGroupById(id).then((group) => {
      if (!group) {
        throw new HttpError(404,'No group found!');
      }
      res.send(group);
    }).catch(error => {
      next(error);
    });
  }

  createGroup (req: Request, res: Response, next): void {
    const group = req.body;
    this.groupService.createGroup(group).then((createdGroup) => {
      res.send(createdGroup);
    }).catch(error => {
      next(error);
    });
  }

  updateGroup (req: Request, res: Response, next): void {
    const newGroup = req.body;
    this.groupService.updateGroup(newGroup).then((newGroup) => {
      if(!newGroup) {
        throw new HttpError(404,'No group found!');
      }
      res.send(newGroup);
    }).catch(error => {
      next(error);
    });
  }

  removeGroup (req: Request, res: Response, next): void{
    const {id} = req.params;
    this.groupService.removeGroup(id).then((oldGroup) => {
      if(!oldGroup) {
        throw new HttpError(404,'No group found!');
      }
      res.send('Group was deleted');
    }).catch(error => {
      next(error);
    });
  }

  addUsersToGroup (req: Request, res: Response, next): void {
    const { groupId } = req.params;
    const userIds = req.body.user_ids;
    this.groupService.addUsersToGroup(groupId, userIds).then( userList => {
      if(!userList) {
        throw new HttpError(404,'No group found!');
      }
        res.send('Users was added to Group');
    }).catch(error => {
      next(error);
    });
  }

}