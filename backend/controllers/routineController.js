import RoutineModel from "../models/routineModel.js";

// Create a new routine
export const createRoutine = async (req, res) => {
  try {
    const userId = req.session?.user?.id;
    if (!userId) {
      return res.status(401).json({ message: "Not authenticated" });
    }

    const { name, description, exercises } = req.body;

    if (!name || !name.trim()) {
      return res.status(400).json({ message: "Routine name is required" });
    }

    // Create the routine
    const routineId = await RoutineModel.createRoutine({
      userId,
      name: name.trim(),
      description
    });

    // Add exercises if provided
    if (exercises && exercises.length > 0) {
      await RoutineModel.addExercisesToRoutine(routineId, exercises);
    }

    res.status(201).json({ 
      message: "Routine created successfully",
      routineId 
    });
  } catch (err) {
    console.error("Create routine error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// Get user stats (plans count, exercises count, total sets)
export const getUserStats = async (req, res) => {
  try {
    const userId = req.session?.user?.id;
    if (!userId) {
      return res.status(401).json({ message: "Not authenticated" });
    }

    const stats = await RoutineModel.getUserStats(userId);
    res.json(stats);
  } catch (err) {
    console.error("Get user stats error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// Get routine dates for calendar
export const getRoutineDates = async (req, res) => {
  try {
    const userId = req.session?.user?.id;
    if (!userId) {
      return res.status(401).json({ message: "Not authenticated" });
    }

    const dates = await RoutineModel.getRoutineDates(userId);
    res.json(dates);
  } catch (err) {
    console.error("Get routine dates error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// Get all routines for the logged-in user
export const getRoutines = async (req, res) => {
  try {
    const userId = req.session?.user?.id;
    if (!userId) {
      return res.status(401).json({ message: "Not authenticated" });
    }

    const routines = await RoutineModel.getUserRoutines(userId);
    res.json(routines);
  } catch (err) {
    console.error("Get routines error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// Get a single routine with exercises
export const getRoutineById = async (req, res) => {
  try {
    const userId = req.session?.user?.id;
    if (!userId) {
      return res.status(401).json({ message: "Not authenticated" });
    }

    const { id } = req.params;
    const routine = await RoutineModel.getRoutineById(id, userId);

    if (!routine) {
      return res.status(404).json({ message: "Routine not found" });
    }

    res.json(routine);
  } catch (err) {
    console.error("Get routine error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// Update a routine
export const updateRoutine = async (req, res) => {
  try {
    const userId = req.session?.user?.id;
    if (!userId) {
      return res.status(401).json({ message: "Not authenticated" });
    }

    const { id } = req.params;
    const { name, description, exercises } = req.body;

    const updated = await RoutineModel.updateRoutine(id, userId, { name, description });
    
    if (!updated) {
      return res.status(404).json({ message: "Routine not found" });
    }

    // Update exercises if provided
    if (exercises) {
      await RoutineModel.updateRoutineExercises(id, exercises);
    }

    res.json({ message: "Routine updated successfully" });
  } catch (err) {
    console.error("Update routine error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// Delete a routine
export const deleteRoutine = async (req, res) => {
  try {
    const userId = req.session?.user?.id;
    if (!userId) {
      return res.status(401).json({ message: "Not authenticated" });
    }

    const { id } = req.params;
    const deleted = await RoutineModel.deleteRoutine(id, userId);

    if (!deleted) {
      return res.status(404).json({ message: "Routine not found" });
    }

    res.json({ message: "Routine deleted successfully" });
  } catch (err) {
    console.error("Delete routine error:", err);
    res.status(500).json({ message: "Server error" });
  }
};
