const { validationResult } = require("express-validator");
const User = require("../models/User");

exports.getProfile = async (req, res, next) => {
	try {
		const user = await User.findById(req.user.userId).select("-password");
		if (!user) return res.status(404).json({ message: "User not found" });
		res.json(user);
	} catch (err) {
		next(err);
	}
};

exports.updateProfile = async (req, res, next) => {
	const errors = validationResult(req);
	if (!errors.isEmpty())
		return res.status(400).json({ errors: errors.array() });

	const updates = {};
	if (req.body.name) updates.name = req.body.name;
	if (req.body.bio !== undefined) updates.bio = req.body.bio;

	try {
		const user = await User.findByIdAndUpdate(req.user.userId, updates, {
			new: true,
		}).select("-password");
		res.json(user);
	} catch (err) {
		next(err);
	}
};
