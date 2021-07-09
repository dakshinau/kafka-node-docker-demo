import * as express from 'express';
import * as http from 'http';
import * as bodyparser from 'body-parser';
import * as winston from 'winston';
import * as expressWinston from 'express-winston';
import * as cors from 'cors'
import {CommonRoutesConfig} from './common/common.routes.config';
import {ShipmentsRoutes} from './shipments/shipments.routes.config';
import debug from 'debug';
import { Server } from 'socket.io';
import {onMessage} from './kafka.consumer';

const app: express.Application = express();
const server: http.Server = http.createServer(app);
const port = 9001;
const routes: Array<CommonRoutesConfig> = [];
const debugLog: debug.IDebugger = debug('app');

const io = new Server(server, {
    cors: {
        origin: '*',
        methods: ["GET", "POST"]
      }
});

io.on('connection', (socket) => {
    console.log('a user connected');
    onMessage((message) => {
        socket.emit("status", message);
    });
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});



const corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200 
 }
app.use(cors(corsOptions));

app.use(express.json());
// app.use(expressWinston.logger({
//     transports: [
//         new winston.transports.Console()
//     ],
//     format: winston.format.combine(
//         winston.format.colorize(),
//         winston.format.json()
//     )
// }));
// app.all('*', function(req, res, next) {
//     res.header('Access-Control-Allow-Origin', '*');
//     res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
//     res.header('Access-Control-Allow-Headers', 'Content-Type');
//     next();
//   });
routes.push(new ShipmentsRoutes(app));

// app.use(expressWinston.errorLogger({
//     transports: [
//         new winston.transports.Console()
//     ],
//     format: winston.format.combine(
//         winston.format.colorize(),
//         winston.format.json()
//     )
// }));


app.get('/', (req: express.Request, res: express.Response) => {
    res.status(200).send(`Server running at http://localhost:${port}`)
});

server.listen(port, () => {
    debugLog(`Server running at http://localhost:${port}`);
    routes.forEach((route: CommonRoutesConfig) => {
        debugLog(`Routes configured for ${route.getName()}`);
    });
});