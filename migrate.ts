import { drizzle } from "drizzle-orm/postgres-js";
import { migrate } from "drizzle-orm/postgres-js/migrator";
import postgres from "postgres";
import * as schema from "./src/lib/server/schema"

const sql = postgres("", { max: 1 })
const db = drizzle(sql, {schema});
await migrate(db, { migrationsFolder: "supabase/migrations" });

await sql.end();