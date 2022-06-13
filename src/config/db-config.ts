import 'dotenv/config';
import { Sequelize } from 'sequelize';

const connectionString = `postgresql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_DATABASE}`

const db = new Sequelize(connectionString, {
  dialect: "postgres",
  logging: false
})

export { db };