import { defineConfig } from 'drizzle-kit'

export default defineConfig({
 schema: "./src/lib/server/schema.ts",
  driver: "pg",
  dbCredentials: {
    connectionString: "postgresql://postgres:postgres@localhost:54322/postgres",
  },
})