import "server-only";
import { Pool } from "pg";

type GlobalWithPool = typeof globalThis & { __pgPool?: Pool };
const globalWithPool = globalThis as GlobalWithPool;

const pool = globalWithPool.__pgPool ?? new Pool({
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    ssl: { rejectUnauthorized: false },
});

if (process.env.NODE_ENV !== "production") {
    globalWithPool.__pgPool = pool;
}

export { pool };
