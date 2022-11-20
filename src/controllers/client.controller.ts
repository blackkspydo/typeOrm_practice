import { Request, Response } from 'express';
import { sqliteDataSource } from '../utils/dataSource';
import { Client } from '../models/client.entity';

export class ClientController {
  public async getAllClients(req: Request, res: Response) {
    try {
      const clientRepository = sqliteDataSource.getRepository(Client);
      const clients = await clientRepository.find();
      if (clients.length > 0) {
        return res.send(clients);
      }
      return res.status(404).send({ message: 'No clients found' });
    } catch (err) {
      console.error(err);
      return res.status(500).send({ message: 'Internal server Error' });
    }
  }

  public async addClient(req: Request, res: Response) {
    try {
      const client = new Client({
        ...req.body
      });
      const clientDB = sqliteDataSource.getRepository(Client);
      const doesClientExist = await clientDB.count({ where: { email: client.email } });
      if (doesClientExist) {
        return res.status(400).send({ message: 'Client already exists' });
      }
      const clientData = await clientDB.save(client);
      return res.json({ clientData });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: 'Internal server error' });
    }
  }
}
