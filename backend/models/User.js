const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
	{
		name: { type: String, required: true, trim: true },
		email: {
			type: String,
			required: true,
			unique: true,
			lowercase: true,
			trim: true,
		},
		password: { type: String, required: true },
		bio: { type: String, default: "" },
		avatar: { type: String, default: "" },
		isEmailVerified: { type: Boolean, default: false },
		emailVerificationToken: String,
		resetPasswordToken: String,
		resetPasswordExpires: Date,
	},
	{ timestamps: true }
);

userSchema.index({ createdAt: 1 });

module.exports = mongoose.model("User", userSchema);
