import { ClientController } from '../controllers/client.controller';
import { Router } from 'express';
import { validate } from '../middlewares/validator';
import { clientSchema } from '../schemas/client.schema';

const router = Router();

const clientController = new ClientController();

router.get('/', clientController.getAllClients);
router.post('/', validate(clientSchema), clientController.addClient);

export { router as clientRouter };
