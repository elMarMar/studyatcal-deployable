import "server-only";
import mysql, { Pool } from "mysql2/promise"; // We create a connection pool instead of createConnection to asynchronously manage multiple connections to the database

// Create new type: globalWithPool that extends globalThis and adds optional __mysqlPool property.
type GlobalWithPool = typeof globalThis & { __mysqlPool?: Pool }; 

// Cast globalWithPool as GlobalWithPool to access the __mysqlPool property.
const globalWithPool = globalThis as GlobalWithPool;

// Try to reuse existing pool if it exists (important during **hot** reload in dev). TODO: FINDOUT WHAT HOT RELOAD IS!
const existingPool = globalWithPool.__mysqlPool;

// Create or Reuse the conection pool
const pool = existingPool ??
    mysql.createPool({ 
        host: process.env.DB_HOST,
        port: Number(process.env.DB_PORT),
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,

        // Pool Behavior Settings
        waitForConnections: true,
        connectionLimit: 10,
        queueLimit: 0,
    });

// Cache pool in development so module reloads do not create many pools. TODO: WHAT DOES THIS PART MEAN!
if (process.env.NODE_ENV !== "production") {
  globalWithPool.__mysqlPool = pool;
}

export { pool };