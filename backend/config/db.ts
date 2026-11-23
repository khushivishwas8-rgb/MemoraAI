import {Pool} from "pg";
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: process.env.PGSSL === "true" ? {rejectUnauthorized:false}:false,
});

pool.on("error",(error) => {
    console.error("PostgreSQL pool error:", error);
});

export default pool;




/*
Instead of creating a new PostgreSQL connection every time you run a query, 
the pool reuses existing connections, making database operations faster and more efficient.

snippet creates and configure a postgresql connectio pool so my application can connect to the database and resue connections efficiently
new Pool() – Creates a pool of reusable database connections.

connectionString – Gets your database URL from environment variables.
ssl – Enables secure database connections when PGSSL is "true".
pool.on("error", ...) – Catches and logs unexpected pool errors.
export default pool – Makes the pool available in other files.
*/