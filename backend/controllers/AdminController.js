import AdminService from "../services/AdminService.js";

class AdminController {
  // Get all users
  async getUsers(req, res) {
    try {
      console.log("AdminController: Getting users...");
      const users = await AdminService.getAllUsers();
      console.log(`AdminController: Fetched ${users.length} users`);
      
      // Format users for frontend - handle different column names
      const formattedUsers = users.map(user => ({
        id: user.id,
        name: user.username || user.name || "Unknown",
        email: user.email || "N/A",
        role: user.role || "User",
        status: user.status || "Active",
        createdAt: user.created_at || user.createdAt || null,
      }));

      console.log(`AdminController: Returning ${formattedUsers.length} formatted users`);
      res.json(formattedUsers);
    } catch (error) {
      console.error("❌ Error in getUsers:", error);
      res.status(500).json({ 
        error: "Failed to fetch users", 
        details: error.toString(),
        message: "Check server logs for more details"
      });
    }
  }

  // Get statistics
  async getStatistics(req, res) {
    try {
      const stats = await AdminService.getStatistics();
      res.json(stats);
    } catch (error) {
      console.error("Error in getStatistics:", error);
      res.status(500).json({ error: "Failed to fetch statistics" });
    }
  }

  // Get user workout statistics
  async getUserWorkoutStats(req, res) {
    try {
      const { userId } = req.params;
      const workoutStats = await AdminService.getUserWorkoutStats(userId);
      res.json(workoutStats);
    } catch (error) {
      console.error("Error in getUserWorkoutStats:", error);
      res.status(500).json({ error: "Failed to fetch workout statistics" });
    }
  }

  // Get user types distribution
  async getUserTypesDistribution(req, res) {
    try {
      const distribution = await AdminService.getUserTypesDistribution();
      res.json(distribution);
    } catch (error) {
      console.error("Error in getUserTypesDistribution:", error);
      res.status(500).json({ error: "Failed to fetch user types distribution" });
    }
  }

  // Get website traffic
  async getWebsiteTraffic(req, res) {
    try {
      const traffic = await AdminService.getWebsiteTraffic();
      res.json(traffic);
    } catch (error) {
      console.error("Error in getWebsiteTraffic:", error);
      res.status(500).json({ error: "Failed to fetch website traffic" });
    }
  }

  // Get user roles distribution
  async getUserRolesDistribution(req, res) {
    try {
      const distribution = await AdminService.getUserRolesDistribution();
      res.json(distribution);
    } catch (error) {
      console.error("Error in getUserRolesDistribution:", error);
      res.status(500).json({ error: "Failed to fetch user roles distribution" });
    }
  }

  // Create new user
  async createUser(req, res) {
    try {
      const { name, email, password, role } = req.body;
      
      // Validate required fields
      if (!name || !email || !password) {
        return res.status(400).json({ error: "Name, email, and password are required" });
      }
      
      const newUser = await AdminService.createUser(name, email, password, role || "User");
      res.status(201).json({ 
        message: "User created successfully",
        user: newUser 
      });
    } catch (error) {
      console.error("Error in createUser:", error);
      const statusCode = error === "User with this email already exists" ? 400 : 500;
      res.status(statusCode).json({ error: error || "Failed to create user" });
    }
  }

  // Delete user
  async deleteUser(req, res) {
    try {
      const { userId } = req.params;
      await AdminService.deleteUser(userId);
      res.json({ message: "User deleted successfully" });
    } catch (error) {
      console.error("Error in deleteUser:", error);
      res.status(500).json({ error: "Failed to delete user" });
    }
  }

  // Update user status
  async updateUserStatus(req, res) {
    try {
      const { userId } = req.params;
      const { status } = req.body;
      await AdminService.updateUserStatus(userId, status);
      res.json({ message: "User status updated successfully" });
    } catch (error) {
      console.error("Error in updateUserStatus:", error);
      res.status(500).json({ error: "Failed to update user status" });
    }
  }
}

export default new AdminController();

