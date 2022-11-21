import { TransactionController } from "../controllers/transaction.controller";
import { Router } from "express";

const router = Router();

const transactionController = new TransactionController();

router.post("/:clientId/transaction", transactionController.createTransactions);
router.get("/:clientId/transaction", transactionController.getTransactions);
router.get("/:clientId/transaction/:transactionId", transactionController.getTransaction);

export { router as transactionRouter };
