const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(
	{
		user: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},
		title: { type: String, required: true, trim: true },
		description: { type: String, default: "" },
		status: {
			type: String,
			enum: ["todo", "in-progress", "done"],
			default: "todo",
		},
		priority: {
			type: String,
			enum: ["low", "medium", "high"],
			default: "medium",
		},
		dueDate: { type: Date, default: null },
		completed: { type: Boolean, default: false },
	},
	{ timestamps: true }
);

module.exports = mongoose.model("Task", taskSchema);
