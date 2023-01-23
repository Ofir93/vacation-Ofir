import { createPool } from 'mysql2'
import dotenv from 'dotenv'
dotenv.config()

export default createPool({
    host: process.env.MYSQL_HOSTNAME,
    user: process.env.MYSQL_USERNAME,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DB_NAME
}).promise()