import * as bodyParser from 'body-parser'

import App from './app'
import router from './routes/index';
import { dbInstance } from './data-access/database';

const app = new App({
    port: 3000,
    middleWares: [
        bodyParser.json(),
        bodyParser.urlencoded({ extended: true }),
        router
    ],
    db: dbInstance
})

app.listen();