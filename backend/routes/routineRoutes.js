import express from "express";
import { 
  createRoutine, 
  getRoutines, 
  getRoutineById, 
  updateRoutine, 
  deleteRoutine,
  getUserStats,
  getRoutineDates
} from "../controllers/routineController.js";

const router = express.Router();

router.get("/", getRoutines);
router.get("/stats", getUserStats);
router.get("/dates", getRoutineDates);
router.post("/", createRoutine);
router.get("/:id", getRoutineById);
router.put("/:id", updateRoutine);
router.delete("/:id", deleteRoutine);

export default router;
