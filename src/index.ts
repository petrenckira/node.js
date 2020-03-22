import * as bodyParser from 'body-parser'
import * as cors from 'cors';

import App from './app'
import router from './routes/index';
import { dbInstance } from './data-access/database';
import { loggerServiceInstance } from './services/logger.service';
import { errorHandlerInstance } from './helpers/error-handler';


const app = new App({
    port: 3000,
    middleWares: [
        cors(),
        bodyParser.json(),
        bodyParser.urlencoded({ extended: true }),
        loggerServiceInstance.logMethodInfo,
        router,
        loggerServiceInstance.logErrors,
        errorHandlerInstance.handleErrorMiddleware
    ],
    db: dbInstance
})

app.listen();

process.on('uncaughtException', (err) => {
    console.error('There was an uncaught error', err)
    process.exit(1) //mandatory (as per the Node docs)
});

process.on('unhandledRejection', (reason, p) => {
    console.log('Unhandled Rejection at:', p, 'reason:', reason);
});