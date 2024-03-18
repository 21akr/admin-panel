import express from 'express';
import { routes } from './Routes';
import * as bodyParser from 'body-parser';
import cors from 'cors';
import { createServer, Server as HttpServer } from 'http';
import { MongoService } from './services/';
import cookieParser from 'cookie-parser';

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

  async start() {
    this.startServer();
    await this.connectMongo();
  }

  startServer() {
    let corsOptions = {
      origin: '*',
      methods: 'GET,PUT,POST,DELETE,OPTIONS',
      allowedHeaders: ['Content-Type', 'Authorization', 'Lang'],
      preflightContinue: false,
      optionsSuccessStatus: 204,
    };

    this.server = express();
    this.server.use(bodyParser.urlencoded({ extended: true }));
    this.server.use(cors(corsOptions));
    this.server.use(bodyParser.json({ limit: '50mb' }));
    this.server.use(express.json());
    this.server.use(cookieParser());
    this.server.use(routes);
    this.http = createServer(this.server);
    this.http.listen(this.port).on('listening', () => {
      console.log(`Server listening on http://localhost:${this.port}`);
    });
  }

  async connectMongo() {
    try {
      this.mongo = await new MongoService().buildUri(this.mongoUrl).buildOptions({ autoIndex: false }).connect();
      console.log(`MongoDB uri: ${this.mongoUrl}`);
    } catch (error) {
      console.error('MongoDB connection error:', error);
    }
  }
}
