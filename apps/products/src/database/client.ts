import { Pool } from "pg"
import { PgConfig } from "../config"
import { DI } from "../di"
import { Provider } from "@nestjs/common"
import { applyMigrations } from "./apply-migrations"

const createPgClient = async (pgConfig: PgConfig) => {
  const pool = new Pool({
    host: pgConfig.host,
    port: pgConfig.port,
    user: pgConfig.user,
    password: pgConfig.password,
    database: pgConfig.database,
    ssl: pgConfig.ssl,
  })

  const client = await pool.connect()

  client.release();

  await applyMigrations(client)

  return client
}

export const PgClientProvider: Provider = {
  provide: DI.DATABASE.CLIENT,
  useFactory: createPgClient,
  inject: [DI.DATABASE.CONFIG],
}
