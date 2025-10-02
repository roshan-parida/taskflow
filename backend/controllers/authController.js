const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

exports.signup = async (req, res, next) => {
	const errors = validationResult(req);
	if (!errors.isEmpty())
		return res.status(400).json({ errors: errors.array() });

	const { name, email, password } = req.body;
	try {
		let user = await User.findOne({ email });
		if (user)
			return res
				.status(400)
				.json({ message: "Email already registered" });

		const salt = await bcrypt.genSalt(10);
		const hashed = await bcrypt.hash(password, salt);

		user = new User({ name, email, password: hashed });
		await user.save();

		const payload = { userId: user._id };
		const token = jwt.sign(payload, process.env.JWT_SECRET, {
			expiresIn: process.env.JWT_EXPIRES_IN || "7d",
		});

		res.status(201).json({ token });
	} catch (err) {
		next(err);
	}
};

exports.login = async (req, res, next) => {
	const errors = validationResult(req);
	if (!errors.isEmpty())
		return res.status(400).json({ errors: errors.array() });

	const { email, password } = req.body;
	try {
		const user = await User.findOne({ email });
		if (!user)
			return res.status(400).json({ message: "Invalid credentials" });

		const isMatch = await bcrypt.compare(password, user.password);
		if (!isMatch)
			return res.status(400).json({ message: "Invalid credentials" });

		const payload = { userId: user._id };
		const token = jwt.sign(payload, process.env.JWT_SECRET, {
			expiresIn: process.env.JWT_EXPIRES_IN || "7d",
		});

		res.json({ token });
	} catch (err) {
		next(err);
	}
};
