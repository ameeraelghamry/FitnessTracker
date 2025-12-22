import ExerciseModel from "../models/exerciseModel.js";
import Questionnaire from "../models/Questionnaire.js";

// Get all exercises
export const getAllExercises = async (req, res) => {
  try {
    const exercises = await ExerciseModel.getAllExercises();
    res.json(exercises);
  } catch (err) {
    console.error("Get exercises error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// Search exercises
export const searchExercises = async (req, res) => {
  try {
    const { q } = req.query;
    
    if (!q || q.trim().length < 1) {
      const exercises = await ExerciseModel.getAllExercises();
      return res.json(exercises);
    }

    const exercises = await ExerciseModel.searchExercises(q.trim());
    res.json(exercises);
  } catch (err) {
    console.error("Search exercises error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// Get exercises by muscle group
export const getByMuscleGroup = async (req, res) => {
  try {
    const { muscleGroup } = req.params;
    const exercises = await ExerciseModel.getByMuscleGroup(muscleGroup);
    res.json(exercises);
  } catch (err) {
    console.error("Get by muscle group error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// Get exercises filtered by user's available equipment
export const getFilteredExercises = async (req, res) => {
  try {
    const userId = req.session?.user?.id;
    if (!userId) {
      // If not logged in, return all exercises
      const exercises = await ExerciseModel.getAllExercises();
      return res.json(exercises);
    }

    Questionnaire.findByUserId(userId, async (err, questionnaire) => {
      if (err) {
        console.error("Get questionnaire error:", err);
        const exercises = await ExerciseModel.getAllExercises();
        return res.json(exercises);
      }

      const userEquipment = questionnaire?.equipment || [];
      
      // If no equipment preferences, return all
      if (userEquipment.length === 0) {
        const exercises = await ExerciseModel.getAllExercises();
        return res.json(exercises);
      }

      // Map questionnaire equipment to database equipment values
      const equipmentMap = {
        "Dumbbells or Kettlebells": ["Dumbbell", "Kettlebell"],
        "Barbells": ["Barbell"],
        "Machines or Cables": ["Machine", "Cable"],
        "Resistance Bands": ["Resistance Band", "Band"],
        "No Equipment": ["Bodyweight"]
      };

      // Build list of allowed equipment
      let allowedEquipment = [];
      userEquipment.forEach(eq => {
        if (equipmentMap[eq]) {
          allowedEquipment = [...allowedEquipment, ...equipmentMap[eq]];
        }
      });

      // Always include bodyweight exercises
      if (!allowedEquipment.includes("Bodyweight")) {
        allowedEquipment.push("Bodyweight");
      }

      const exercises = await ExerciseModel.getByEquipment(allowedEquipment);
      res.json(exercises);
    });
  } catch (err) {
    console.error("Get filtered exercises error:", err);
    res.status(500).json({ message: "Server error" });
  }
};
