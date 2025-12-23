import express from "express";
import SocialShareController from "../controllers/socialShareController.js";

const router = express.Router();

router.get("/", (req, res) => SocialShareController.getShares(req, res));
router.get("/stats", (req, res) => SocialShareController.getShareStats(req, res));
router.post("/", (req, res) => SocialShareController.createShare(req, res));
router.delete("/:id", (req, res) => SocialShareController.deleteShare(req, res));

export default router;
