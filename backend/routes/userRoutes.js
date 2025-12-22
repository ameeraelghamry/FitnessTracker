import express from "express";
import { getUserQuestionnaire, getUserEquipment, getUserDashboard } from "../controllers/userController.js";

const router = express.Router();

router.get("/questionnaire", getUserQuestionnaire);
router.get("/equipment", getUserEquipment);
router.get("/dashboard", getUserDashboard);

export default router;
