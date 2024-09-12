const express = require("express");
const User = require("../models/user");

const router = express.Router();

// Handle user login and add to the database
router.post("/login", async (req, res) => {
	const { googleId, name, email } = req.body;

	try {
		let user = await User.findOne({ googleId });

		if (!user) {
			user = new User({ googleId, name, email });
			await user.save();
			console.log("User created:", user);
		} else {
			console.log("User already exists:", user);
		}

		res.status(200).json(user);
	} catch (err) {
		console.error("Error logging in user:", err.message);
		res.status(500).json({ error: "Failed to log in user" });
	}
});

module.exports = router;