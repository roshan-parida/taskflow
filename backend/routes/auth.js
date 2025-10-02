const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const authController = require("../controllers/authController");

// POST /api/auth/signup
router.post(
	"/signup",
	[
		body("name")
			.isLength({ min: 2 })
			.withMessage("Name must be at least 2 characters"),
		body("email").isEmail().withMessage("Invalid email"),
		body("password")
			.isLength({ min: 6 })
			.withMessage("Password must be at least 6 characters"),
	],
	authController.signup
);

// POST /api/auth/login
router.post(
	"/login",
	[
		body("email").isEmail().withMessage("Invalid email"),
		body("password").exists().withMessage("Password is required"),
	],
	authController.login
);

module.exports = router;
