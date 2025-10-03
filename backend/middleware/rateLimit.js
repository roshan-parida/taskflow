const rateLimit = require("express-rate-limit");

exports.authLimiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	max: 5, // limit each IP to 5 requests per windowMs
	message: {
		message: "Too many authentication attempts, please try again later",
	},
	standardHeaders: true,
	legacyHeaders: false,
});

exports.apiLimiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	max: 100, // limit each IP to 100 requests per windowMs
	message: {
		message: "Too many requests, please try again later",
	},
	standardHeaders: true,
	legacyHeaders: false,
});
