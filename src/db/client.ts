
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as dbSchema from "./schema";

const client = postgres(process.env.DATABASE_URL as string, {idle_timeout: 1000, ssl: 'require'});
const db = drizzle(client, {schema: dbSchema});

export default db;