import { Request, Response } from "express";
import { Transaction } from "../models/transaction.entity";
import { validate } from "class-validator";
import { Client } from "../models/client.entity";
import { sqliteDataSource } from "../utils/dataSource";

export class TransactionController {
  public async createTransactions(req: Request, res: Response) {
    const { clientId } = req.params;
    const transaction = new Transaction({
      ...req.body
    });
    const errors = await validate(transaction);
    if (errors.length > 0) {
      return res.status(400).send(
        errors.map((item) => {
          return {
            property: item.property,
            constraints: item.constraints
          };
        })
      );
    }
    const clientRepository = sqliteDataSource.getRepository(Client);

    const client = await clientRepository.findOne({
      where: {
        id: clientId
      }
    });
    if (!client) {
      return res.status(404).send({ message: "Client not found" });
    }

    if ((transaction.type === "withdrawal" || transaction.type === "transfer") && transaction.amount > client.balance) {
      return res.status(400).send({ message: "Insufficient funds" });
    }

    transaction.client = client;
    transaction.createdAt = new Date();

    const transactionRepository = sqliteDataSource.getRepository(Transaction);

    await transactionRepository.save(transaction);

    if (transaction.type === "deposit") {
      client.balance = client.balance + transaction.amount;
      await clientRepository.save(client);
      return res.status(201).send({
        message: `Deposit successful, new balance is ${client.balance}`
      });
    } else if (transaction.type === "withdrawal") {
      client.balance = client.balance - transaction.amount;
      await clientRepository.save(client);
      return res.status(201).send({
        message: `Withdrawal Successful, new balance is ${client.balance}`
      });
    } else if (transaction.type === "transfer") {
      client.balance = client.balance - transaction.amount;
      await clientRepository.save(client);
      return res.status(201).send({
        message: `Transfer Successful, new balance is ${client.balance}`
      });
    }
    return res.status(400).send({ message: "Invalid transaction type" });
  }

  public async getTransactions(req: Request, res: Response) {
    try {
      const { clientId } = req.params;
      console.log(clientId);
      const client = await sqliteDataSource
        .createQueryBuilder()
        .select("client")
        .from(Client, "client")
        .leftJoinAndSelect("client.transactions", "transactions")
        .select([
          "client.id",
          "client.firstName",
          "client.lastName",
          "client.email",
          "client.cardNumber",
          "client.balance",
          "transactions.type",
          "transactions.amount",
          "transactions.createdAt"
        ])
        .where("client.id = :id", { id: clientId })
        .getOne();

      if (client) {
        return res.send(client);
      }
      return res.status(404).send({ message: "Transaction not found" });
    } catch (err) {
      console.error(err);
      return res.status(500).send({ message: "Internal server Error" });
    }
  }
  public async getTransaction(req: Request, res: Response) {
    try {
      const { transactionId: id } = req.params;
      const transactionRepository = sqliteDataSource.getRepository(Transaction);
      const transactions = await transactionRepository
        .createQueryBuilder("transaction")
        .where("id = :id", { id })
        .getOne();
      if (transactions) {
        return res.send(transactions);
      }
      return res.status(404).send({ message: "Transaction not found" });
    } catch (err) {
      console.error(err);
      return res.status(500).send({ message: "Internal server Error" });
    }
  }
}
