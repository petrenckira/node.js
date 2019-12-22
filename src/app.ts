import * as express from 'express'
import { Application } from 'express'

class App {
    public app: Application;
    public port: number;

    constructor(appInit: { port: number; middleWares: any;}) {
        this.app = express();
        this.port = appInit.port;

        this.middlewares(appInit.middleWares);
    }

    private middlewares(middleWares: { forEach: (arg0: (middleWare: any) => void) => void; }) {
        middleWares.forEach(middleWare => {
            this.app.use(middleWare);
        })
    }

    public listen() {
        this.app.listen(this.port, () => {
            console.log(`App listening on the http://localhost:${this.port}`);
        })
    }
}

export default App