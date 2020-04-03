import { Request, Response } from 'express';
import UserService from '../services/user.service';
import { HttpError } from '../helpers/error-handler';
import { userServiceInstance } from './../services/user.service';
import * as jwt from 'jsonwebtoken';

const accessTokenSecret = process.env.JWT_SECRET;

export default class AuthController {

  constructor(public userService: UserService) {}

  login = (req: Request, res: Response, next): void => {
    const { username, password } = req.body;

    this.userService.getUsers({loginSubstring: username, limit:1, isFullLogin:true})
        .then( users => {
          if (users[0].login === username && users[0].password === password) {
            const accessToken = jwt.sign({ username: users[0].login}, accessTokenSecret, { expiresIn: '1h' });

            res.json({
              accessToken
            });
          } else {
            throw new HttpError(404,'Username of password is incorrect');
          }
        }).catch(error => {
          next(error);
        });
  }

  checkJWT(req: Request, res: Response, next): void {
    const authHeader = req.headers.authorization;

    if (authHeader) {

      jwt.verify(authHeader, accessTokenSecret, (err, user) => {
          if (err) {
            throw new HttpError(403,'Access denied');
          }
          next();
      });
    } else {
      throw new HttpError(401,'Not authorized');
    }
  }

}

export const authController = new AuthController(userServiceInstance);
