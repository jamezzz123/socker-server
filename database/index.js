import { Connection, createConnection, SimpleConsoleLogger } from "typeorm";
import dotenv from 'dotenv';

dotenv.config({});
class Database {

  connection;

  constructor() {
    this.connectToDB();
  }

  connectToDB() {
    createConnection({
      type: envString("mysql", "sqlite"),
      host: process.env.DATABASE_HOST,
      port: process.env.DATABASE_PORT,
      username: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,
      database: envString(process.env.DATABASE_NAME, "./db.sqlite"),
      entities: [
        __dirname + "/entity/*.ts",
        __dirname + "/entity/*.js"
      ],
      synchronize: true,
      logging: false
    }).then(_con => {
      this.connection = _con;
      console.log("Connected to db!!");
    }).catch(console.error)
  }

}


function envString(prodString, devString) {
  return process.env.NODE_ENV === 'production' ? prodString : devString
}

export const db = new Database();