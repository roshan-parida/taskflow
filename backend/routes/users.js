const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const userController = require("../controllers/userController");
const auth = require("../middleware/auth");

// GET /api/users/profile
router.get("/profile", auth, userController.getProfile);

// PUT /api/users/profile
router.put(
	"/profile",
	auth,
	[
		body("name")
			.optional()
			.isLength({ min: 2 })
			.withMessage("Name must be at least 2 characters"),
		body("bio").optional().isString(),
	],
	userController.updateProfile
);

module.exports = router;
