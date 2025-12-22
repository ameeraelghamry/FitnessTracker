import AuthService from "../services/AuthService.js";

class AuthController {
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
      res.status(400).json({ error });
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
