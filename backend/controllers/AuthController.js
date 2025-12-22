import AuthService from "../services/AuthService.js";

class AuthController {
  async signup(req, res) {
    const { username, email, password, questionnaire } = req.body;

    try {
      const message = await AuthService.signup(
        username,
        email,
        password,
        questionnaire
      );
      res.status(201).json({ message });
    } catch (error) {
      const errorMessage = error?.message || error || "An error occurred";
      console.error("Signup error:", error);
      res.status(400).json({ error: errorMessage });
    }
  }

  async login(req, res) {
    const { email, password } = req.body;

    try {
      const user = await AuthService.login(email, password);

      // ✅ Save user in session
      req.session.user = {
        email,
        username: user.username,
      };

      res.json({
        message: `Welcome, ${user.username}!`,
        username: user.username,
      });
      console.log("Login request body:", req.body);

    } catch (error) {
      const errorMessage = error?.message || error || "An error occurred";
      console.error("Login error:", error);
      res.status(400).json({ error: errorMessage });
    }
  }

  logout(req, res) {
    req.session.destroy(() => {
      res.json({ message: "Logged out successfully" });
    });
  }

  checkAuth(req, res) {
    if (req.session.user) {
      res.json({ loggedIn: true, user: req.session.user });
    } else {
      res.json({ loggedIn: false });
    }
  }
}

export default new AuthController();
