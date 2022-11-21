import { sqliteDataSource } from "./utils/dataSource";
import express from "express";
import { clientRouter } from "./routes/client.router";
import { bankerRouter } from "./routes/banker.router";
import { transactionRouter } from "./routes/transaction.router";
import bodyParser from "body-parser";
import dotenv from "dotenv";
dotenv.config();

const jsonParser = bodyParser.json();

const app = express();
const port = 8080;
app.use(jsonParser);

sqliteDataSource
  .initialize()
  .then(() => {
    console.log("Data source initialized");
  })
  .catch((err) => {
    console.log("Error initializing data source", err);
  });

app.use("/api/clients", clientRouter);
app.use("/api/clients", transactionRouter);
app.use("/api/bankers", bankerRouter);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
