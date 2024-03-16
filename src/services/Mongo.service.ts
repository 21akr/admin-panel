import { MongoConnectionStatusEnum } from '../infrastructure';
import mongoose, { ConnectOptions, Mongoose } from 'mongoose';

export class MongoService {
  uri: string;
  db: Mongoose;
  options: ConnectOptions;
  status: MongoConnectionStatusEnum;

  buildUri(uri: string): MongoService {
    this.uri = uri;
    return this;
  }

  buildOptions(options: ConnectOptions): MongoService {
    this.options = options;
    return this;
  }

  async connect(): Promise<void> {
    this.db = await mongoose.connect(this.uri, this.options);
    console.log('Connected to MongoDB');
    this.status = MongoConnectionStatusEnum.CONNECTED;

    this.db.connection.on('disconnected', async () => {
      console.log('MongoDB disconnected');
      this.status = MongoConnectionStatusEnum.DISCONNECTED;
      await this.reconnect();
    });

    this.db.connection.on('error', async err => {
      console.error('MongoDB connection error:', err);
      this.status = MongoConnectionStatusEnum.DISCONNECTED;
      await this.reconnect();
    });
  }

  private async reconnect(): Promise<void> {
    if (this.status !== MongoConnectionStatusEnum.DISCONNECTED) {
      return;
    }

    try {
      await this.db.connect(this.uri, this.options);
      console.log('Reconnected to MongoDB');
      this.status = MongoConnectionStatusEnum.CONNECTED;
    } catch (err) {
      console.error('Failed to reconnect to MongoDB:', err);
    }
  }

  async disconnect(): Promise<void> {
    try {
      this.status = MongoConnectionStatusEnum.DISCONNECTED;
      await this.db.disconnect();
    } catch (error) {
      throw error;
    }
  }
}
