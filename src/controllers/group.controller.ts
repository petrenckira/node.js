import { Request, Response } from 'express';
import GroupService from '../services/group.service';

export default class GroupController {

  constructor(public groupService: GroupService) {}

  getAllGroups (req: Request, res: Response): void {
    this.groupService.getGroups().then((groupList) => {
      res.json(groupList);
    });
  }

  getGroupById (req: Request, res: Response): void{
    const {id} = req.params;
    this.groupService.getGroupById(id).then((group) => {
      if (!group) {
        res.status(404).send('No group found!');
      } else {
        res.send(group);
      }
    });
  }

  createGroup (req: Request, res: Response): void {
    const group = req.body;
    this.groupService.createGroup(group).then((createdGroup) => {
      res.send(createdGroup);
    });
  }

  updateGroup (req: Request, res: Response): void {
    const newGroup = req.body;
    this.groupService.updateGroup(newGroup).then((newGroup) => {
      if(!newGroup) {
        res.status(404).send('No group found!');
      } else {
        res.send(newGroup);
      }
    });
  }

  removeGroup (req: Request, res: Response): void{
    const {id} = req.params;
    this.groupService.removeGroup(id).then((oldGroup) => {
      if(!oldGroup) {
        res.status(404).send('No group found!');
      } else {
        res.send('Group was deleted');
      }
    });
  }

  addUsersToGroup (req: Request, res: Response): void {
    const { groupId } = req.params;
    const userIds = req.body.user_ids;
    this.groupService.addUsersToGroup(groupId, userIds).then( userList => {
      console.log(userList);
      if(!userList) {
        return res.status(404).send('No group found!');
      }
        res.send('Users was added to Group');
    })
  }

}