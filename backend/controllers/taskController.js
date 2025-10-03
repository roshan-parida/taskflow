const { validationResult } = require("express-validator");
const Task = require("../models/Task");

exports.listTasks = async (req, res, next) => {
	const errors = validationResult(req);
	if (!errors.isEmpty())
		return res.status(400).json({ errors: errors.array() });

	try {
		const userId = req.user.userId;
		const {
			search,
			status,
			priority,
			completed,
			tags,
			sortBy = "createdAt",
			sortOrder = "desc",
		} = req.query;

		const page = Math.max(parseInt(req.query.page) || 1, 1);
		const limit = Math.min(parseInt(req.query.limit) || 20, 100);

		const filter = { user: userId, isDeleted: false };

		if (search) {
			const re = new RegExp(search, "i");
			filter.$or = [{ title: re }, { description: re }];
		}
		if (status) filter.status = status;
		if (priority) filter.priority = priority;
		if (completed !== undefined)
			filter.completed = completed === "true" || completed === true;
		if (tags) {
			const tagArray = Array.isArray(tags) ? tags : tags.split(",");
			filter.tags = { $in: tagArray };
		}

		const sort = {};
		sort[sortBy] = sortOrder === "asc" ? 1 : -1;

		const total = await Task.countDocuments(filter);
		const tasks = await Task.find(filter)
			.sort(sort)
			.skip((page - 1) * limit)
			.limit(limit)
			.select("-isDeleted");

		res.json({
			tasks,
			total,
			page,
			limit,
			totalPages: Math.ceil(total / limit),
		});
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
		const { title, description, priority, status, dueDate, tags } =
			req.body;

		const task = new Task({
			user: userId,
			title,
			description,
			priority,
			status,
			dueDate,
			tags: tags || [],
		});
		await task.save();

		const taskResponse = task.toObject();
		delete taskResponse.isDeleted;

		res.status(201).json(taskResponse);
	} catch (err) {
		next(err);
	}
};

exports.getTask = async (req, res, next) => {
	try {
		const task = await Task.findOne({
			_id: req.params.id,
			isDeleted: false,
		});

		if (!task) return res.status(404).json({ message: "Task not found" });
		if (task.user.toString() !== req.user.userId)
			return res.status(403).json({ message: "Unauthorized" });

		const taskResponse = task.toObject();
		delete taskResponse.isDeleted;

		res.json(taskResponse);
	} catch (err) {
		next(err);
	}
};

exports.updateTask = async (req, res, next) => {
	const errors = validationResult(req);
	if (!errors.isEmpty())
		return res.status(400).json({ errors: errors.array() });

	try {
		const task = await Task.findOne({
			_id: req.params.id,
			isDeleted: false,
		});

		if (!task) return res.status(404).json({ message: "Task not found" });
		if (task.user.toString() !== req.user.userId)
			return res.status(403).json({ message: "Unauthorized" });

		const updates = req.body;

		if (
			updates.completed !== undefined &&
			updates.completed !== task.completed
		) {
			updates.completedAt = updates.completed ? new Date() : null;
		}

		Object.assign(task, updates);
		await task.save();

		const taskResponse = task.toObject();
		delete taskResponse.isDeleted;

		res.json(taskResponse);
	} catch (err) {
		next(err);
	}
};

exports.deleteTask = async (req, res, next) => {
	try {
		const task = await Task.findOne({
			_id: req.params.id,
			isDeleted: false,
		});

		if (!task) return res.status(404).json({ message: "Task not found" });
		if (task.user.toString() !== req.user.userId)
			return res.status(403).json({ message: "Unauthorized" });

		task.isDeleted = true;
		await task.save();

		res.json({ message: "Task deleted" });
	} catch (err) {
		next(err);
	}
};
