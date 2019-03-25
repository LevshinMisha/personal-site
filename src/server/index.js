import dotenv from 'dotenv';
import { createServer } from './server';

dotenv.config();

createServer(
  process.env.NODE_ENV,
  process.env.PORT,
  () => console.info(`${process.env.NODE_ENV} server started on ${process.env.PORT} port`)
);