import SocialShareService from "../services/SocialShareService.js";

class SocialShareController {
  // Get user's shareable stats
  async getUserStats(req, res) {
    try {
      const { userId } = req.params;
      const stats = await SocialShareService.getUserStats(userId);
      res.json(stats);
    } catch (error) {
      console.error("Error in getUserStats:", error);
      res.status(500).json({ error: "Failed to fetch user stats" });
    }
  }

  // Generate share content
  async generateShareContent(req, res) {
    try {
      const { userId } = req.params;
      const { type } = req.query; // progress, streak, achievement, workout, invite
      
      const content = await SocialShareService.generateShareContent(userId, type || "progress");
      res.json(content);
    } catch (error) {
      console.error("Error in generateShareContent:", error);
      res.status(500).json({ error: "Failed to generate share content" });
    }
  }

  // Log a share action
  async logShare(req, res) {
    try {
      const { userId, platform, contentType, contentId } = req.body;
      
      if (!userId || !platform) {
        return res.status(400).json({ error: "userId and platform are required" });
      }

      const result = await SocialShareService.logShare(
        userId, 
        platform, 
        contentType || "progress", 
        contentId
      );
      
      res.json({ 
        message: "Share logged successfully",
        ...result 
      });
    } catch (error) {
      console.error("Error in logShare:", error);
      res.status(500).json({ error: "Failed to log share" });
    }
  }

  // Get share statistics (admin)
  async getShareStats(req, res) {
    try {
      const stats = await SocialShareService.getShareStats();
      res.json(stats);
    } catch (error) {
      console.error("Error in getShareStats:", error);
      res.status(500).json({ error: "Failed to fetch share stats" });
    }
  }

  // Get total shares by platform (admin)
  async getTotalSharesByPlatform(req, res) {
    try {
      const totals = await SocialShareService.getTotalSharesByPlatform();
      res.json(totals);
    } catch (error) {
      console.error("Error in getTotalSharesByPlatform:", error);
      res.status(500).json({ error: "Failed to fetch share totals" });
    }
  }

  // Get user's share history
  async getUserShares(req, res) {
    try {
      const { userId } = req.params;
      const shares = await SocialShareService.getUserShares(userId);
      res.json(shares);
    } catch (error) {
      console.error("Error in getUserShares:", error);
      res.status(500).json({ error: "Failed to fetch user shares" });
    }
  }
}

export default new SocialShareController();
