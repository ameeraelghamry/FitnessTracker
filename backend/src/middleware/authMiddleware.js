// Authentication middleware - checks if user is logged in
export const requireAuth = (req, res, next) => {
  if (!req.session || !req.session.user || !req.session.user.id) {
    return res.status(401).json({ error: "Not authenticated" });
  }
  next();
};

// Authorization middleware - checks if user is Admin
export const requireAdmin = (req, res, next) => {
  // First check authentication
  if (!req.session || !req.session.user || !req.session.user.id) {
    return res.status(401).json({ error: "Not authenticated" });
  }
  
  // Then check admin role
  if (req.session.user.role !== "Admin") {
    return res.status(403).json({ error: "Access denied. Admin privileges required." });
  }
  
  next();
};

// Authorization middleware - checks if user is Member (any authenticated user)
export const requireMember = (req, res, next) => {
  if (!req.session || !req.session.user || !req.session.user.id) {
    return res.status(401).json({ error: "Not authenticated" });
  }
  
  // Both Member and Admin can access member routes
  if (req.session.user.role !== "Member" && req.session.user.role !== "Admin") {
    return res.status(403).json({ error: "Access denied." });
  }
  
  next();
};
