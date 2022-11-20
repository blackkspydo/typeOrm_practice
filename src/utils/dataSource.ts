import { DataSource } from 'typeorm';
import { rootPath } from './path';

export const sqliteDataSource = new DataSource({
  type: 'sqlite',
  database: `${rootPath}/database.sqlite`,
  entities: [__dirname + '/../**/*.entity{.ts,.js}'],
  logging: true,
  synchronize: true
});
