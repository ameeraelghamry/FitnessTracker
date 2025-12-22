import express from "express";
import AuthController from "../controllers/AuthController.js";

const router = express.Router();

router.post("/signup", (req, res) => AuthController.signup(req, res));
router.post("/login", (req, res) => AuthController.login(req, res));
router.post("/logout", (req, res) => AuthController.logout(req, res));
router.get("/me", (req, res) => AuthController.checkAuth(req, res));


export default router;
