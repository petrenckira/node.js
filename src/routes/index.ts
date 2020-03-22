import { Router } from 'express';
import userRouter from './user.router';
import groupRouter from './group.router';
import authRouter from './auth.router';
import { authController } from './../controllers/auth.controller';

const router = Router();

router.use('/users', authController.checkJWT, userRouter)
      .use('/groups', authController.checkJWT,groupRouter)
      .use('/login', authRouter)
      .use('/', (req, res) => {
            res.send('Welcome to app!');
        });

export default router;