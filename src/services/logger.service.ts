import { Request, Response } from 'express';

export class LoggerService {
  constructor(){}

  logMethodInfo (req: Request, res: Response, next): void {
    console.log('\n', Date.now(), req.method, req.originalUrl, req.params || req.body);
    next();
  }
}

export const loggerServiceInstance = new LoggerService();