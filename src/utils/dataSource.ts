import { DataSource } from 'typeorm';
import { ENV_VARIABLES } from '../variables';

const pg_dataSource = new DataSource({
  type: 'postgres',
  host: ENV_VARIABLES.dataSources.HOST,
  port: ENV_VARIABLES.dataSources.PORT,
  username: ENV_VARIABLES.dataSources.USERNAME,
  password: ENV_VARIABLES.dataSources.PASSWORD,
});
