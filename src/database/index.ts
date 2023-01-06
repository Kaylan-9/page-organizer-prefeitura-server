import * as dotenv from 'dotenv';
dotenv.config();
import mongoose from 'mongoose';

export default abstract class {
  constructor() {
    this.init();
  }

  private async init() {
    mongoose.set("strictQuery", false);
    await mongoose.connect(process.env.CONNSTR as string);
  }
}