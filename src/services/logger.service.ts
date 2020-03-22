import { Request, Response } from 'express';
import * as winston from 'winston';

export class LoggerService {
  public logger;
  constructor(){
    this.logger = winston.createLogger({
      transports: [
        new winston.transports.Console()
       ]
    });
  }

  logMethodInfo (req: Request, res: Response, next): void {
    console.log('\n', Date.now(), req.method, req.originalUrl, req.params || req.body);
    next();
  }

  logErrors = (err, req, res, next): void =>{
    this.logger.error( err);
    next(err);
  }
}

export const loggerServiceInstance = new LoggerService();