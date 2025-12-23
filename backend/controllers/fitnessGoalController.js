import FitnessGoal from "../models/FitnessGoal.js";
import Notification from "../models/Notification.js";

class FitnessGoalController {
  // Get all goals for user
  getGoals(req, res) {
    const userId = req.session.user?.id;
    if (!userId) return res.status(401).json({ error: "Not authenticated" });

    FitnessGoal.getByUserId(userId, (err, results) => {
      if (err) return res.status(500).json({ error: "Database error" });
      res.json(results);
    });
  }

  // Get active goals
  getActiveGoals(req, res) {
    const userId = req.session.user?.id;
    if (!userId) return res.status(401).json({ error: "Not authenticated" });

    FitnessGoal.getActiveByUserId(userId, (err, results) => {
      if (err) return res.status(500).json({ error: "Database error" });
      res.json(results);
    });
  }

  // Create new goal
  createGoal(req, res) {
    const userId = req.session.user?.id;
    if (!userId) return res.status(401).json({ error: "Not authenticated" });

    const { title, description, targetDate, goalType, targetValue, unit } = req.body;

    if (!title) {
      return res.status(400).json({ error: "Title is required" });
    }

    FitnessGoal.create(
      userId, title, description || "", targetDate || null, 
      goalType || "general", targetValue || null, unit || null,
      (err, result) => {
        if (err) return res.status(500).json({ error: "Database error" });

        // Create notification for new goal
        Notification.create(
          userId,
          "goal",
          "New Goal Set! 🎯",
          `You've set a new goal: ${title}. Let's crush it!`,
          () => {}
        );

        res.status(201).json({ 
          message: "Goal created successfully", 
          goalId: result.insertId 
        });
      }
    );
  }

  // Update goal progress
  updateProgress(req, res) {
    const userId = req.session.user?.id;
    const { id } = req.params;
    const { currentValue } = req.body;
    
    if (!userId) return res.status(401).json({ error: "Not authenticated" });

    FitnessGoal.updateProgress(id, userId, currentValue, (err) => {
      if (err) return res.status(500).json({ error: "Database error" });

      // Check if goal is completed
      FitnessGoal.getByUserId(userId, (err, goals) => {
        const goal = goals?.find(g => g.id == id);
        if (goal && goal.target_value && currentValue >= goal.target_value) {
          // Goal completed!
          FitnessGoal.updateStatus(id, userId, "completed", () => {});
          Notification.create(
            userId,
            "achievement",
            "Goal Achieved! 🏆",
            `Congratulations! You've completed your goal: ${goal.title}`,
            () => {}
          );
        }
      });

      res.json({ message: "Progress updated" });
    });
  }

  // Complete goal
  completeGoal(req, res) {
    const userId = req.session.user?.id;
    const { id } = req.params;
    
    if (!userId) return res.status(401).json({ error: "Not authenticated" });

    FitnessGoal.updateStatus(id, userId, "completed", (err) => {
      if (err) return res.status(500).json({ error: "Database error" });

      Notification.create(
        userId,
        "achievement",
        "Goal Achieved! 🏆",
        "Congratulations on completing your fitness goal!",
        () => {}
      );

      res.json({ message: "Goal marked as completed" });
    });
  }

  // Delete goal
  deleteGoal(req, res) {
    const userId = req.session.user?.id;
    const { id } = req.params;
    
    if (!userId) return res.status(401).json({ error: "Not authenticated" });

    FitnessGoal.delete(id, userId, (err) => {
      if (err) return res.status(500).json({ error: "Database error" });
      res.json({ message: "Goal deleted" });
    });
  }

  // Get upcoming goals (for reminders)
  getUpcomingGoals(req, res) {
    const userId = req.session.user?.id;
    if (!userId) return res.status(401).json({ error: "Not authenticated" });

    FitnessGoal.getUpcoming(userId, (err, results) => {
      if (err) return res.status(500).json({ error: "Database error" });
      res.json(results);
    });
  }
}

export default new FitnessGoalController();
