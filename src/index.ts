import { sqliteDataSource } from './utils/dataSource';
import express from 'express';

const app = express();
const port = 3000;

sqliteDataSource
  .initialize()
  .then(() => {
    console.log('Data source initialized');
  })
  .catch((err) => {
    console.log('Error initializing data source', err);
  });

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
