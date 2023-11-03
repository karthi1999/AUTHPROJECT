import pg from "pg";
import { Redis } from "ioredis";

// const POOL = pg.Pool
const { Pool } = pg;

const pool = new Pool({
  user: "root",
  password: "root@123",
  host: "localhost",
  port: "5432",
  database: "auth"
})

const redis = new Redis({
  host: "localhost",
  port: 6379 // default port
})



export {
  pool,
  redis
};