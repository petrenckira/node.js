import { Router } from 'express';
import { createValidator } from 'express-joi-validation';

import GroupController from '../controllers/group.controller';
import { groupSchema, userGroupSchema } from '../validations/group.validation';
import { groupServiceInstance } from '../services/group.service';
import { HttpError } from '../helpers/error-handler';

const groupRouter = Router();
const validator = createValidator({});
const groupController = new GroupController(groupServiceInstance);

groupRouter.get('/error', (req, res): void => {
                  throw new HttpError(500, 'Internal server error');
            })
            .get('/:id', groupController.getGroupById.bind(groupController))
            .get('/', groupController.getAllGroups.bind(groupController))
            .post('/', validator.body(groupSchema), groupController.createGroup.bind(groupController))
            .put('/', validator.body(groupSchema), groupController.updateGroup.bind(groupController))
            .put('/:groupId', validator.body(userGroupSchema), groupController.addUsersToGroup.bind(groupController))
            .delete('/:id', groupController.removeGroup.bind(groupController))


export default groupRouter;