import * as bodyParser from 'body-parser'

import App from './app'
import router from './routes/index';

const app = new App({
    port: 3000,
    middleWares: [
        bodyParser.json(),
        bodyParser.urlencoded({ extended: true }),
        router
    ]
})

app.listen();