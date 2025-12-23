import SocialShare from "../models/SocialShare.js";
import Notification from "../models/Notification.js";

class SocialShareController {
  // Get user's share history
  getShares(req, res) {
    const userId = req.session.user?.id;
    if (!userId) return res.status(401).json({ error: "Not authenticated" });

    SocialShare.getByUserId(userId, (err, results) => {
      if (err) return res.status(500).json({ error: "Database error" });
      res.json(results);
    });
  }

  // Get share stats
  getShareStats(req, res) {
    const userId = req.session.user?.id;
    if (!userId) return res.status(401).json({ error: "Not authenticated" });

    SocialShare.getShareCount(userId, (err, results) => {
      if (err) return res.status(500).json({ error: "Database error" });
      res.json(results);
    });
  }

  // Create a new share
  createShare(req, res) {
    const userId = req.session.user?.id;
    if (!userId) return res.status(401).json({ error: "Not authenticated" });

    const { routineId, platform, shareType, message } = req.body;

    if (!platform) {
      return res.status(400).json({ error: "Platform is required" });
    }

    SocialShare.create(userId, routineId || null, platform, shareType || "routine", message || "", (err, result) => {
      if (err) return res.status(500).json({ error: "Database error" });

      // Create notification for the share
      Notification.create(
        userId,
        "share",
        "Content Shared!",
        `You shared ${shareType || "content"} on ${platform}`,
        () => {} // Fire and forget
      );

      res.status(201).json({ 
        message: "Shared successfully", 
        shareId: result.insertId 
      });
    });
  }

  // Delete share record
  deleteShare(req, res) {
    const userId = req.session.user?.id;
    const { id } = req.params;
    if (!userId) return res.status(401).json({ error: "Not authenticated" });

    SocialShare.delete(id, userId, (err) => {
      if (err) return res.status(500).json({ error: "Database error" });
      res.json({ message: "Share record deleted" });
    });
  }
}

export default new SocialShareController();
