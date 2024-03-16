import express from 'express';
import { routes } from './Routes';
import * as bodyParser from 'body-parser';
import { createServer, Server as HttpServer } from 'http';
import session from 'express-session';
import { MongoService } from './services/';
const memoryStore = new session.MemoryStore();

// export const app = express();
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json({ limit: '50mb' }));
// app.use(express.json());
// app.use(routes);
//
// connectMongo().then(() => {
//   log.info('Connected to DB');
// });

export class App {
  public server: express.Application;
  public http: HttpServer;
  public mongo: any;
  public mongoUrl: string;
  public port: number;
  public secret: string;

  constructor(options: any) {
    this.mongoUrl = options.mongoUrl;
    this.port = options.port;
    this.secret = options.secret;
  }

  start() {
    this.startServer();
    this.connectMongo();
  }

  startServer() {
    this.server = express();
    this.server.use(bodyParser.urlencoded({ extended: true }));
    this.server.use(bodyParser.json({ limit: '50mb' }));
    this.server.use(express.json());

    this.server.use(
      session({
        secret: this.secret,
        resave: false,
        saveUninitialized: true,
        store: memoryStore,
      }),
    );

    this.server.use(routes);
    this.http = createServer(this.server);
    this.http.listen(this.port).on('listening', () => {
      console.log(`Server listening on http://localhost:${this.port}`);
    });
  }

  connectMongo() {
    this.mongo = new MongoService()
      .buildUri(this.mongoUrl)
      .buildOptions({ autoIndex: false })
      .connect()
      .then(() => {
        console.log(`MongoDB uri: ${this.mongoUrl}`);
      });
  }
}
