import Questionnaire from "../models/Questionnaire.js";
import db from "../config/database.js";

// Get user's questionnaire data
export const getUserQuestionnaire = async (req, res) => {
  try {
    const userId = req.session?.user?.id;
    if (!userId) {
      return res.status(401).json({ message: "Not authenticated" });
    }

    Questionnaire.findByUserId(userId, (err, questionnaire) => {
      if (err) {
        console.error("Get questionnaire error:", err);
        return res.status(500).json({ message: "Server error" });
      }
      res.json(questionnaire || {});
    });
  } catch (err) {
    console.error("Get questionnaire error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// Get user's available equipment from questionnaire
export const getUserEquipment = async (req, res) => {
  try {
    const userId = req.session?.user?.id;
    if (!userId) {
      return res.status(401).json({ message: "Not authenticated" });
    }

    Questionnaire.findByUserId(userId, (err, questionnaire) => {
      if (err) {
        console.error("Get equipment error:", err);
        return res.status(500).json({ message: "Server error" });
      }
      
      const equipment = questionnaire?.equipment || [];
      res.json({ equipment });
    });
  } catch (err) {
    console.error("Get equipment error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// Get user dashboard stats
export const getUserDashboard = async (req, res) => {
  try {
    const userId = req.session?.user?.id;
    if (!userId) {
      return res.status(401).json({ message: "Not authenticated" });
    }

    // Get questionnaire data
    Questionnaire.findByUserId(userId, async (err, questionnaire) => {
      if (err) {
        console.error("Get dashboard error:", err);
        return res.status(500).json({ message: "Server error" });
      }

      // Get routine stats
      const statsSql = `
        SELECT 
          (SELECT COUNT(*) FROM routines WHERE user_id = ?) as total_routines,
          (SELECT COUNT(*) FROM routine_exercises re 
           JOIN routines r ON re.routine_id = r.id 
           WHERE r.user_id = ?) as total_exercises,
          (SELECT COALESCE(SUM(re.sets), 0) FROM routine_exercises re 
           JOIN routines r ON re.routine_id = r.id 
           WHERE r.user_id = ?) as total_sets,
          (SELECT COUNT(DISTINCT DATE(r.created_at)) FROM routines r WHERE r.user_id = ?) as active_days
      `;
      
      try {
        const [stats] = await db.getConnection().promise().execute(statsSql, [userId, userId, userId, userId]);
        
        res.json({
          questionnaire: questionnaire || {},
          stats: stats[0] || {},
          measures: {
            height: questionnaire?.height_cm || null,
            weight: questionnaire?.weight_kg || null,
            goalWeight: questionnaire?.goal_weight_kg || null,
            fitnessLevel: questionnaire?.fitness_level || null
          }
        });
      } catch (dbErr) {
        console.error("Stats query error:", dbErr);
        res.status(500).json({ message: "Server error" });
      }
    });
  } catch (err) {
    console.error("Get dashboard error:", err);
    res.status(500).json({ message: "Server error" });
  }
};
