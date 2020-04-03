import * as express from 'express'
import { Application } from 'express'
import { Sequelize } from 'sequelize';
import * as bodyParser from 'body-parser'
import * as cors from 'cors';

import { loggerServiceInstance } from './services/logger.service';
import { errorHandlerInstance } from './helpers/error-handler';


export default class App {
    public app: Application;
    public port: string;
    public db: Sequelize;

    constructor(appInit: { port: string; controllers: Array<any>; db: Sequelize }) {
        this.app = express();
        this.port = appInit.port;
        this.db = appInit.db;

        this.initMiddleware();
        this.initializeControllers(appInit.controllers);
        this.initializeErrorHandling();
    }

    private initMiddleware(): void {
        const middleWares = [
            cors(),
            bodyParser.json(),
            bodyParser.urlencoded({ extended: true }),
            loggerServiceInstance.logMethodInfo,
            loggerServiceInstance.logErrors,
            errorHandlerInstance.handleErrorMiddleware
        ];

        this.addMiddleware(middleWares);
    }

    private addMiddleware(middleWares: { forEach: (arg0: (middleWare) => void) => void }): void {
        middleWares.forEach(middleWare => {
            this.app.use(middleWare);
        })
    }

    private initializeControllers(controllers): void {
        controllers.forEach((controller) => {
          this.app.use('/', controller.router);
        });
      }

    private initializeErrorHandling(): void {
        const middleWares = [
            loggerServiceInstance.logMethodInfo,
            loggerServiceInstance.logErrors,
            errorHandlerInstance.handleErrorMiddleware
        ];

        this.addMiddleware(middleWares);
    }

    public listen(): void{
        this.db.sync().then(()=> {
            this.app.listen(this.port, () => {
                console.log(`App listening on the http://localhost:${this.port}`);
            });
        });
    }

    public getServer(): any {
        return this.app;
    }
}
