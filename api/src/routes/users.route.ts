import express from "express";
import { userController } from "../controllers";

const router = express.Router();

router.get("/", userController.getAll);
router.get("/:userId", userController.getOne);

export default router;
