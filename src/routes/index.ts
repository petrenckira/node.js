import { Router } from 'express';
import userRouter from './user.router';

const router = Router();

router.use('/users', userRouter)
      .use('/', (req, res) => {
            res.send('Welcome to app!');
        });

export default router;