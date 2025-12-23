import WorkoutReminder from "../models/WorkoutReminder.js";
import Notification from "../models/Notification.js";

class WorkoutReminderController {
  // Get all reminders for user
  getReminders(req, res) {
    const userId = req.session.user?.id;
    if (!userId) return res.status(401).json({ error: "Not authenticated" });

    WorkoutReminder.getByUserId(userId, (err, results) => {
      if (err) return res.status(500).json({ error: "Database error" });
      res.json(results);
    });
  }

  // Get today's reminders
  getTodayReminders(req, res) {
    const userId = req.session.user?.id;
    if (!userId) return res.status(401).json({ error: "Not authenticated" });

    WorkoutReminder.getTodayReminders(userId, (err, results) => {
      if (err) return res.status(500).json({ error: "Database error" });
      res.json(results);
    });
  }

  // Create new reminder
  createReminder(req, res) {
    const userId = req.session.user?.id;
    if (!userId) return res.status(401).json({ error: "Not authenticated" });

    const { routineId, title, reminderTime, reminderDays } = req.body;

    if (!title || !reminderTime || !reminderDays) {
      return res.status(400).json({ error: "Title, time, and days are required" });
    }

    WorkoutReminder.create(
      userId, routineId || null, title, reminderTime, reminderDays,
      (err, result) => {
        if (err) return res.status(500).json({ error: "Database error" });

        // Create notification
        Notification.create(
          userId,
          "reminder",
          "Workout Reminder Set! ⏰",
          `You'll be reminded to: ${title}`,
          () => {}
        );

        res.status(201).json({ 
          message: "Reminder created successfully", 
          reminderId: result.insertId 
        });
      }
    );
  }

  // Update reminder
  updateReminder(req, res) {
    const userId = req.session.user?.id;
    const { id } = req.params;
    const { title, reminderTime, reminderDays, isActive } = req.body;
    
    if (!userId) return res.status(401).json({ error: "Not authenticated" });

    WorkoutReminder.update(id, userId, title, reminderTime, reminderDays, isActive, (err) => {
      if (err) return res.status(500).json({ error: "Database error" });
      res.json({ message: "Reminder updated" });
    });
  }

  // Toggle reminder active status
  toggleReminder(req, res) {
    const userId = req.session.user?.id;
    const { id } = req.params;
    const { isActive } = req.body;
    
    if (!userId) return res.status(401).json({ error: "Not authenticated" });

    WorkoutReminder.toggleActive(id, userId, isActive, (err) => {
      if (err) return res.status(500).json({ error: "Database error" });
      res.json({ message: isActive ? "Reminder activated" : "Reminder paused" });
    });
  }

  // Delete reminder
  deleteReminder(req, res) {
    const userId = req.session.user?.id;
    const { id } = req.params;
    
    if (!userId) return res.status(401).json({ error: "Not authenticated" });

    WorkoutReminder.delete(id, userId, (err) => {
      if (err) return res.status(500).json({ error: "Database error" });
      res.json({ message: "Reminder deleted" });
    });
  }

  // Generate reminder notifications (call this periodically or on login)
  generateReminderNotifications(req, res) {
    const userId = req.session.user?.id;
    if (!userId) return res.status(401).json({ error: "Not authenticated" });

    WorkoutReminder.getTodayReminders(userId, (err, reminders) => {
      if (err) return res.status(500).json({ error: "Database error" });

      reminders.forEach(reminder => {
        Notification.create(
          userId,
          "workout",
          "Time to Workout! 💪",
          `Don't forget: ${reminder.title}${reminder.routine_name ? ` - ${reminder.routine_name}` : ''}`,
          () => {}
        );
      });

      res.json({ message: `Generated ${reminders.length} reminder notifications` });
    });
  }
}

export default new WorkoutReminderController();
