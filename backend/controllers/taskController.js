const { validationResult } = require("express-validator");
const Task = require("../models/Task");

exports.listTasks = async (req, res, next) => {
	const errors = validationResult(req);
	if (!errors.isEmpty())
		return res.status(400).json({ errors: errors.array() });

	try {
		const userId = req.user.userId;
		const { search, status, priority, completed } = req.query;
		const page = parseInt(req.query.page) || 1;
		const limit = Math.min(parseInt(req.query.limit) || 20, 100);

		const filter = { user: userId };
		if (search) {
			const re = new RegExp(search, "i");
			filter.$or = [{ title: re }, { description: re }];
		}
		if (status) filter.status = status;
		if (priority) filter.priority = priority;
		if (completed !== undefined)
			filter.completed = completed === "true" || completed === true;

		const total = await Task.countDocuments(filter);
		const tasks = await Task.find(filter)
			.sort({ createdAt: -1 })
			.skip((page - 1) * limit)
			.limit(limit);

		res.json({ tasks, total, page, limit });
	} catch (err) {
		next(err);
	}
};

exports.createTask = async (req, res, next) => {
	const errors = validationResult(req);
	if (!errors.isEmpty())
		return res.status(400).json({ errors: errors.array() });

	try {
		const userId = req.user.userId;
		const { title, description, priority, status, dueDate } = req.body;

		const task = new Task({
			user: userId,
			title,
			description,
			priority,
			status,
			dueDate,
		});
		await task.save();
		res.status(201).json(task);
	} catch (err) {
		next(err);
	}
};

exports.getTask = async (req, res, next) => {
	try {
		const task = await Task.findById(req.params.id);
		if (!task) return res.status(404).json({ message: "Task not found" });
		if (task.user.toString() !== req.user.userId)
			return res.status(403).json({ message: "Unauthorized" });
		res.json(task);
	} catch (err) {
		next(err);
	}
};

exports.updateTask = async (req, res, next) => {
	const errors = validationResult(req);
	if (!errors.isEmpty())
		return res.status(400).json({ errors: errors.array() });

	try {
		const task = await Task.findById(req.params.id);
		if (!task) return res.status(404).json({ message: "Task not found" });
		if (task.user.toString() !== req.user.userId)
			return res.status(403).json({ message: "Unauthorized" });

		const updates = req.body;
		Object.assign(task, updates);
		await task.save();
		res.json(task);
	} catch (err) {
		next(err);
	}
};

exports.deleteTask = async (req, res, next) => {
	try {
		const task = await Task.findById(req.params.id);
		if (!task) return res.status(404).json({ message: "Task not found" });
		if (task.user.toString() !== req.user.userId)
			return res.status(403).json({ message: "Unauthorized" });

		await task.deleteOne();
		res.json({ message: "Task deleted" });
	} catch (err) {
		next(err);
	}
};
