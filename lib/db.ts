import "server-only";
import { Pool } from "pg";

type GlobalWithPool = typeof globalThis & { __pgPool?: Pool };
const globalWithPool = globalThis as GlobalWithPool;

const pool = globalWithPool.__pgPool ?? new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false },
});

if (process.env.NODE_ENV !== "production") {
    globalWithPool.__pgPool = pool;
}

export { pool };
