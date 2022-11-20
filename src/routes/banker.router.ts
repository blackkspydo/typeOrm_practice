import { BankerController } from "../controllers/banker.controller";
import { Router } from "express";

const router = Router();

const bankerController = new BankerController();

router.get("/", bankerController.getAllBankers);
router.get("/:id", bankerController.getBanker);
router.post("/", bankerController.addBanker);
router.put("/:id", bankerController.updateBanker);

export { router as bankerRouter };
