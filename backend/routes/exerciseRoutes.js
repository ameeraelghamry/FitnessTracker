import express from "express";
import { 
  getAllExercises, 
  searchExercises, 
  getByMuscleGroup,
  getFilteredExercises
} from "../controllers/exerciseController.js";

const router = express.Router();

router.get("/", getAllExercises);
router.get("/filtered", getFilteredExercises);
router.get("/search", searchExercises);
router.get("/muscle/:muscleGroup", getByMuscleGroup);

export default router;
