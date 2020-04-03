import 'dotenv/config';
import App from './app'
import { dbInstance } from './data-access/database';
import UserController from './controllers/user.controller';
import { models } from './models'

const PORT = process.env.PORT;

const app = new App({
    port: PORT,
    controllers:[
        new UserController(models.user)
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