import { PoolClient } from "pg";
import * as schema from './schema';
import { drizzle } from 'drizzle-orm/node-postgres';
import { migrate } from 'drizzle-orm/node-postgres/migrator';
import { Logger } from "@nestjs/common";
import { resolve } from "path";

const migrationsPath = resolve(__dirname, '..', 'products', 'migrations');

export const applyMigrations = async (client: PoolClient) => {
  const db = drizzle(client, { schema });

  await migrate(db, { migrationsFolder: migrationsPath });

  Logger.log('🚀 Migrations applied');
}
