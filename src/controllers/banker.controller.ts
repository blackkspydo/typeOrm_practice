import { Request, Response } from "express";
import { validate } from "class-validator";

import { sqliteDataSource } from "../utils/dataSource";
import { Banker } from "../models/bankers.entity";

export class BankerController {
  public async getAllBankers(req: Request, res: Response) {
    try {
      const bankerRepository = sqliteDataSource.getRepository(Banker);
      const bankers = await bankerRepository.find();
      if (bankers.length > 0) {
        return res.send(bankers);
      }
      return res.status(404).send({ message: "No bankers found" });
    } catch (err) {
      console.error(err);
      return res.status(500).send({ message: "Internal server Error" });
    }
  }
  public async addBanker(req: Request, res: Response) {
    try {
      const banker = new Banker({
        ...req.body
      });
      const ValidationError = await validate(banker);
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
      const bankerDB = sqliteDataSource.getRepository(Banker);
      const doesBankerEmailExist = await bankerDB.count({
        where: {
          email: banker.email
        }
      });
      const doesBankerEmployeeIDExist = await bankerDB.count({
        where: {
          employeeId: banker.employeeId
        }
      });
      const doesBankerCardNumberExist = await bankerDB.count({
        where: {
          cardNumber: banker.cardNumber
        }
      });

      if (doesBankerEmailExist > 0) {
        return res.status(400).send({ message: "Banker with this email already exists" });
      }
      if (doesBankerEmployeeIDExist > 0) {
        return res.status(400).send({ message: "Banker with this employee ID already exists" });
      }
      if (doesBankerCardNumberExist > 0) {
        return res.status(400).send({ message: "Banker with this card number already exists" });
      }
      const bankerData = await bankerDB.save(banker);
      return res.json({ bankerData });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: "Internal server error" });
    }
  }

  public async getBanker(req: Request, res: Response) {
    try {
      const id = req.params.id;
      const bankerRepository = sqliteDataSource.getRepository(Banker);
      const banker = await bankerRepository.findOne({
        where: {
          id
        }
      });
      if (banker) {
        return res.send(banker);
      }
      return res.status(404).send({ message: "Banker not found" });
    } catch (err) {
      console.error(err);
      return res.status(500).send({ message: "Internal server Error" });
    }
  }

  public async updateBanker(req: Request, res: Response) {
    try {
      const id = req.params.id;
      const bankerRepository = sqliteDataSource.getRepository(Banker);
      const banker = await bankerRepository.findOne({
        where: {
          id
        }
      });
      if (banker) {
        const {
          firstName = banker.firstName,
          lastName = banker.lastName,
          email = banker.email,
          cardNumber = banker.cardNumber,
          employeeId = banker.employeeId
        } = req.body;

        banker.firstName = firstName;
        banker.lastName = lastName;
        banker.email = email;
        banker.cardNumber = cardNumber;
        banker.employeeId = employeeId;
        const ValidationError = await validate(banker);
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
        const updatedBanker = await bankerRepository.save(banker);
        return res.send(updatedBanker);
      }
      return res.status(404).send({ message: "Banker not found" });
    } catch (err) {
      console.error(err);
      return res.status(500).send({ message: "Internal server Error" });
    }
  }
}
