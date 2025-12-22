import express from "express";
import SocialShareController from "../controllers/SocialShareController.js";

const router = express.Router();

// Helper function to wrap async route handlers
const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

// Get user's shareable stats
router.get("/stats/:userId", asyncHandler((req, res) => SocialShareController.getUserStats(req, res)));

// Generate share content for a user
router.get("/content/:userId", asyncHandler((req, res) => SocialShareController.generateShareContent(req, res)));

// Log a share action
router.post("/log", asyncHandler((req, res) => SocialShareController.logShare(req, res)));

// Get user's share history
router.get("/history/:userId", asyncHandler((req, res) => SocialShareController.getUserShares(req, res)));

// Admin: Get share statistics
router.get("/admin/stats", asyncHandler((req, res) => SocialShareController.getShareStats(req, res)));

// Admin: Get total shares by platform
router.get("/admin/totals", asyncHandler((req, res) => SocialShareController.getTotalSharesByPlatform(req, res)));

export default router;
