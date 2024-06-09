import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';

dotenv.config();

export const AppDataSource = new DataSource({
  type: 'postgres',
  url: process.env.TYPEORM_URL,
  synchronize: Boolean(process.env.TYPEORM_SYNCHRONIZE),
  logging: Boolean(process.env.TYPEORM_LOGIN),
  migrations: [process.env.TYPEORM_MIGRATIONS],
  migrationsTableName: process.env.TYPEORM_MIGRATIONS_TABLE_NAME,
  entities: [process.env.TYPEORM_ENTITIES],
  // dropSchema: true,
});
