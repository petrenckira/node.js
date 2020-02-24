import { Router } from 'express';
import userRouter from './user.router';
import groupRouter from './group.router';

const router = Router();

router.use('/users', userRouter)
      .use('/groups', groupRouter)
      .use('/', (req, res) => {
            res.send('Welcome to app!');
        });

export default router;