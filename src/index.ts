import { App } from './App';
import * as dotenv from 'dotenv';

dotenv.config();

let options = {
  port: parseInt(process.env.PORT),
  mongoUrl: `${process.env.URI}`,
  secret: `${process.env.JWT_SECRET}`,
};

export const app = new App(options);
app.start();
