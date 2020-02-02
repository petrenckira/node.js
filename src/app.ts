import * as express from 'express'
import { Application } from 'express'
import { Sequelize } from 'sequelize';
import { userServiceInstance } from './services/user.service';

class App {
    public app: Application;
    public port: number;
    public db: Sequelize;

    constructor(appInit: { port: number; middleWares; db: Sequelize }) {
        this.app = express();
        this.port = appInit.port;
        this.db = appInit.db;

        this.initMiddleware(appInit.middleWares);
    }

    private initMiddleware(middleWares: { forEach: (arg0: (middleWare) => void) => void }): void {
        middleWares.forEach(middleWare => {
            this.app.use(middleWare);
        })
    }

    public listen(): void{
        this.db.sync().then(()=> {
            this.app.listen(this.port, () => {
                console.log(`App listening on the http://localhost:${this.port}`);
            });
        });
    }
}

export default App