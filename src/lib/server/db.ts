import { DATABASE_URL } from '$env/static/private';
import { drizzle } from 'drizzle-orm/postgres-js'
import * as schema from './schema';
import postgres from 'postgres'

const client = postgres(DATABASE_URL)

export const db = drizzle(client, { schema });
