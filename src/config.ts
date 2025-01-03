import { registerAs } from '@nestjs/config';

export default registerAs('config', () => ({
  key: process.env.KEY,
  mongo: {
    dbName: process.env.MONGO_DB_NAME,
    user: process.env.MONGO_USER,
    password: process.env.MONGO_PASSWORD,
    host: process.env.MONGO_HOST,
    port: process.env.MONGO_PORT,
    connection: process.env.MONGO_CONNECTION,
  },
}));
