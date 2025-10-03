const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(
	{
		user: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			required: true,
			index: true,
		},
		title: { type: String, required: true, trim: true },
		description: { type: String, default: "" },
		status: {
			type: String,
			enum: ["todo", "in-progress", "done"],
			default: "todo",
			index: true,
		},
		priority: {
			type: String,
			enum: ["low", "medium", "high"],
			default: "medium",
			index: true,
		},
		dueDate: { type: Date, default: null },
		completed: { type: Boolean, default: false, index: true },
		completedAt: { type: Date, default: null },
		tags: [{ type: String, trim: true }],
		isDeleted: { type: Boolean, default: false },
	},
	{ timestamps: true }
);

taskSchema.index({ user: 1, status: 1 });
taskSchema.index({ user: 1, priority: 1 });
taskSchema.index({ user: 1, dueDate: 1 });
taskSchema.index({ user: 1, completed: 1 });
taskSchema.index({ user: 1, createdAt: -1 });

module.exports = mongoose.model("Task", taskSchema);
