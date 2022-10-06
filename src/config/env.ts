import dotenv from 'dotenv';

dotenv.config();

export default {
  port: process.env.PORT || 7000,
  jwtSecret: process.env.JWT_SECRET || 'secret',
  mySqlUser: process.env.MYSQL_USER || 'root',
  mySqlPassword: process.env.MYSQL_PASSWORD || 'password',
  mySqlHost: process.env.MYSQL_HOST || 'db',
};