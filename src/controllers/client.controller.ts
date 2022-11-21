import { Request, Response } from "express";
import { validate } from "class-validator";

import { sqliteDataSource } from "../utils/dataSource";
import { Client } from "../models/client.entity";
export class ClientController {
  public async getAllClients(req: Request, res: Response) {
    try {
      const clientRepository = sqliteDataSource.getRepository(Client);
      const clients = await clientRepository.find();
      if (clients.length > 0) {
        return res.send(clients);
      }
      return res.status(404).send({ message: "No clients found" });
    } catch (err) {
      console.error(err);
      return res.status(500).send({ message: "Internal server Error" });
    }
  }

  public async addClient(req: Request, res: Response) {
    try {
      const client = new Client({
        ...req.body
      });
      const ValidationError = await validate(client);
      if (ValidationError.length > 0) {
        return res.status(400).send(
          ValidationError.map((item) => {
            return {
              property: item.property,
              constraints: item.constraints
            };
          })
        );
      }
      const clientDB = sqliteDataSource.getRepository(Client);
      const doesClientEmailExist = await clientDB.count({
        where: {
          email: client.email
        }
      });
      const doesClientCardNumberExist = await clientDB.count({
        where: {
          cardNumber: client.cardNumber
        }
      });
      if (doesClientEmailExist > 0) {
        return res.status(400).send({ message: "Client with this email already exists" });
      }
      if (doesClientCardNumberExist > 0) {
        return res.status(400).send({ message: "Client with this card number already exists" });
      }
      const clientData = await clientDB.save(client);
      return res.json({ clientData });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: "Internal server error" });
    }
  }

  public async getClient(req: Request, res: Response) {
    try {
      const id = req.params.id;
      const clientRepository = sqliteDataSource.getRepository(Client);
      const client = await clientRepository.findOne({
        where: {
          id
        }
      });
      if (client) {
        return res.send(client);
      }
      return res.status(404).send({ message: "Client not found" });
    } catch (err) {
      console.error(err);
      return res.status(500).send({ message: "Internal server Error" });
    }
  }
  public async updateClient(req: Request, res: Response) {
    try {
      const id = req.params.id;
      const clientRepository = sqliteDataSource.getRepository(Client);
      const client = await clientRepository.findOne({
        where: {
          id
        }
      });
      if (client) {
        const {
          firstName = client.firstName,
          lastName = client.lastName,
          email = client.email,
          cardNumber = client.cardNumber,
          isActive = client.isActive,
          currencies = client.currencies,
          balance = client.balance
        } = req.body;

        client.firstName = firstName;
        client.lastName = lastName;
        client.email = email;
        client.cardNumber = cardNumber;
        client.isActive = isActive;
        client.currencies = currencies;
        client.balance = balance;
        console.log(client);
        const ValidationError = await validate(client);
        if (ValidationError.length > 0) {
          return res.status(400).send(
            ValidationError.map((item) => {
              return {
                property: item.property,
                constraints: item.constraints
              };
            })
          );
        }

        const updatedClient = await clientRepository.save(client);
        return res.send(updatedClient);
      }
      return res.status(404).send({ message: "Client not found" });
    } catch (err) {
      console.error(err);
      return res.status(500).send({ message: "Internal server Error" });
    }
  }
  public async deleteClient(req: Request, res: Response) {
    const { id } = req.params;
    const clientRepository = sqliteDataSource.getRepository(Client);
    const client = await clientRepository.delete({
      id
    });
    if (client.affected) {
      return res.status(204).send({
        message: "Client deleted"
      });
    }
    return res.status(404).send({ message: "Client not found" });
  }
}
