import express from "express";
import { movieController } from "../controllers/movieController.js";
const router = express.Router();
router.get("/", movieController.getAll);
router.get("/:id", movieController.getById);
router.post("/", movieController.create);
router.patch("/:id", movieController.update);
router.delete("/:id", movieController.remove);
export default router;