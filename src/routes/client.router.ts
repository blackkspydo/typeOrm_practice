import { ClientController } from "../controllers/client.controller";
import { Router } from "express";

const router = Router();

const clientController = new ClientController();

router.get("/", clientController.getAllClients);
router.get("/:id", clientController.getClient);
router.post("/", clientController.addClient);
router.put("/:id", clientController.updateClient);

export { router as clientRouter };
